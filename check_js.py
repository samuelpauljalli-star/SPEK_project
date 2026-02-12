import sys

path = r'c:\websites 000\wilson_health_care\data.js'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# Remove 'const products = ' and the trailing ';'
# This is a bit hacky but let's see
try:
    # Basic check for balanced brackets
    stack = []
    for i, char in enumerate(content):
        if char in '[{':
            stack.append((char, i))
        elif char in ']}':
            if not stack:
                print(f"Extra closing bracket '{char}' at position {i}")
                sys.exit(1)
            last_open, last_pos = stack.pop()
            if (last_open == '[' and char != ']') or (last_open == '{' and char != '}'):
                print(f"Mismatch: '{last_open}' at {last_pos} closed by '{char}' at {i}")
                sys.exit(1)
    
    if stack:
        print(f"Unbalanced brackets. {len(stack)} still open.")
        for s in stack[:5]:
            print(f"  {s[0]} at {s[1]}")
    else:
        print("Brackets are balanced.")
except Exception as e:
    print(f"Error: {e}")
