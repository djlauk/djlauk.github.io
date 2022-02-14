<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit'

	export const load: Load = () => {
		return {
			stuff: {
				pageTitle: 'PowerShell Rename Screenshots',
			},
		}
	}
</script>

<div class="shadow-lg p-2 flex flex-col space-y-2">
	<div>
		<p class="border-sky-600 border-0 border-l-2 text-small text-gray-800 bg-sky-100 p-2">
			Copy and Paste into Windows ISE, and adapt <code>$PREFIX</code>, and
			<code>$SCREENSHOTDIR</code>
			and <code>$EXTENSION</code>, if you need to.<br />
			(This is how I have <em>Greenshot</em> set up; so I only need to change
			<code>$PREFIX</code>.)
		</p>
	</div>
	<div>
		<pre class="bg-gray-100 font-mono p-2">{`Clear-Host
$PREFIX = "my_screenshots_"
$SCREENSHOTDIR = "$env:USERPROFILE\\Pictures\\screenshots"
$EXTENSION = ".png"

$today = Get-Date -Format "yyyy-MM-dd"
$i = $(Get-ChildItem $SCREENSHOTDIR -Filter "$PREFIX*$EXTENSION").Count
Write-Host "Renaming screenshots in $SCREENSHOTDIR"

$screenshots = Get-ChildItem $SCREENSHOTDIR -Filter "$today*$EXTENSION"
Write-Host "$($screenshots.Count) file(s) found.\`n"

foreach ($f in $screenshots)
{
    $i++
    if ($i -lt 10) {$counter = "0$i"} else {$counter = $i}
    $newname = "$PREFIX$counter$($f.Extension)"
    Write-Host "$($f.Name) -> $newname"
    Rename-Item "$($f.FullName)" -NewName $newname
}
Write-Host "\`nDone."`}</pre>
	</div>
</div>
