<script>
    import Input from './components/Input.svelte'
    import ToolBar from './components/ToolBar.svelte'
    import {preview} from './lib/previewer.js'
    let bookmarks = [], searchStr = '', currrentTab = {}
    $:searchStr && chrome.bookmarks?.search(searchStr, (list)=>{
        bookmarks = list
        console.table(list)
        }
    )
    chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
        currrentTab = tabs[0]
        // use `url` here inside the callback because it's asynchronous!
    });

    function add(){

        chrome.bookmarks.create(
            {parentId: bookmarkBar.id, title: currrentTab.title, url: currrentTab.url},
            function(newFolder) {
                console.log("added folder: " + newFolder.title);
            }
        )
    }
</script>

<link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet">
	
<ToolBar>{currrentTab.title}<Input class = "" bind:value = {searchStr} type = "text" /><i class = "cursor-pointer" on:click = {add}>✔️</i></ToolBar>
<div class = "flex flex-col divide-y-2 p-4 bg-blue-100 w-96 h-96 overflow-y-auto">
    <!-- {#each bookmarks.filter(item => item.title.toLowerCase().includes(searchStr.toLowerCase())) as {dateAdded, id, index, parentId, title, url }} -->
    {#each bookmarks as {dateAdded, id, index, parentId, title, url }}
        <a use:preview class = "flex gap-3 hover:bg-blue-200 p-2" href = "{url}" target = "_blank">{title}</a>
    {/each}
    <!-- <span>sss</span>
    <span>sss</span>
    <span>sss</span>
    <span>sss</span>
    <span>sss</span>
    <span>sss</span>
    <span>sss</span>
    <span>sss</span>
    <span>sss</span> -->
</div>

<style>
	:global(.iframestyle) {
		position: absolute;
		width: 375px;
		height: 812px;
/* 		https://medium.com/@jamesfuthey/simulating-the-creation-of-website-thumbnail-screenshots-using-iframes-7145269891db */
		-ms-zoom: 0.25;
		-moz-transform: scale(0.25);
		-moz-transform-origin: 0 0;
		-o-transform: scale(0.25);
		-o-transform-origin: 0 0;
		-webkit-transform: scale(0.25);
		-webkit-transform-origin: 0 0;
		border: 1px solid black;
	}
</style>