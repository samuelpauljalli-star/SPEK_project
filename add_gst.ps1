$path = "index.html"
$content = [IO.File]::ReadAllText($path)
$callback = {
    param($match)
    $id = [int]$match.Groups[1].Value
    $tax = 5
    if ($id % 3 -eq 0) { $tax = 12 }
    elseif ($id % 2 -eq 0) { $tax = 18 }
    return "id: $id,`r`n                gst: $tax,"
}
$newContent = [Regex]::Replace($content, "id:\s*(\d+),", $callback)
[IO.File]::WriteAllText($path, $newContent, [System.Text.Encoding]::UTF8)
