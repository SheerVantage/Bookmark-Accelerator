<script>
    // import SearchBox from './components/Search_Box.svelte'
    // import SearchBox from '../../svelte/web-components/src/components/Search_Box.svelte'
    import ToolBar from './components/ToolBar.svelte'
    import SearchBox from './components/Input.svelte'
    import {preview} from './lib/previewer.js'
    import { each } from 'svelte/internal';
    let bookmarks = [], searchStr = '', currrentTab = {}
    let data = {}
    // console.log({storage:chrome.storage, name:'abcd'})
    // chrome.storage.local.get('bma.data', data=>{
            // console.log(data)
    // })
    async function loadStorage(){
        data = await window.localStorage.getItem('bma.data')
        data = JSON.parse(data)
        bookmarks = data.list || []
        searchStr = data.text
        console.log(data)
    }
    loadStorage()

    $:searchStr && chrome.bookmarks.search(searchStr, async (list)=>{
            bookmarks = list
            // console.table(list)
            // chrome.storage.local.set('bma.data', JSON.stringify( { text:searchStr, list: list } ) )
            window.localStorage.setItem('bma.data', JSON.stringify( { text:searchStr, list: list } ) )
        }
    )
    let tree = []
    chrome.bookmarks.getTree().then(data=>{
        // tree = data
    })
    chrome.bookmarks.getRecent(5, list=>{
        tree = list
    })
    // .then(data=>{
    //     tree = data
    // })
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
    $:exp = new RegExp('\\b' + searchStr + '\\b', 'ig') //if(searchStr){ }
    function highlight(str){
        return str.replace(exp, `<b>${searchStr}</b>`)
    }
</script>

<link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet">
	
<ToolBar caption = "BmAcc">
    <!-- {currrentTab.title} -->
    <span class = "flex gap-1">
        {#if bookmarks.length > 0}<span class = "border rounded bg-blue-200 px-1">{bookmarks.length}</span> {/if}
        <SearchBox class = "" bind:value = {searchStr} type = "text" />
        <!-- <i class = "cursor-pointer" on:click = {add}>✔️</i> -->
    </span>
</ToolBar>
<!-- {tree && tree.length}
{#each tree as item}
    {item.title}
{/each} -->
<!-- {tree && JSON.stringify(tree)} -->
<!-- { tree } -->
<ul class = "flex flex-col divide-y-2 divide-slate-200 gap-1s px-3 pb-3 bg-blue-50 w-96 h-96 overflow-y-auto">
    <!-- {#each bookmarks.filter(item => item.title.toLowerCase().includes(searchStr.toLowerCase())) as {dateAdded, id, index, parentId, title, url }} -->
    {#each bookmarks as {dateAdded, id, index, parentId, title, url }, index}
        <li class = "align-middle row flex place-items-center hover:bg-blue-200">
            <span>{index + 1}<!--img class = "w-8 h-8" /--></span>
            <a uses:preview class = " p-2" href = "{url}" target = "_blank">{@html highlight(title)}</a>
        </li>
    {/each}
</ul>

<style>
	:global(.iframestyle) {
		position: absolute;
		width: 375px;
		height: 812px;
/* 		https://medium.com/@jamesfuthey/simulating-the-creation-of-website-thumbnail-screenshots-using-iframes-7145269891db */
		transform: scale(0.25);
		transform-origin: 0 0;
		border: 1px solid black;
	}
    .badge { border-radius: 10px; background: slategray; color: white; padding: 0 10px; display: flex; margin-right: 0.5rem; align-items: center; }
    .flex { display: flex; }
    .row {display: grid; grid-template-columns: 1rem 2rem 1fr; gap: 0.2rem; align-items: center; padding-tops: 0.5rem;}
</style>