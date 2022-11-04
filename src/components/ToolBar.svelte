<script>
    export let loadData
    import {notifications} from './lib/notification.js'
    function refreshData(){
        loadData()
        notifications.success('😊 Refresh 😊', 1000)
    }
</script>

<header class="flex flex-row text-gray-600  bg-gray-100 rounded items-center">
    <div class="flex p-2 w-full">
    
        <a href="a" class="flex title-font font-medium items-center text-gray-900 ">
            <img alt="a" class="w-6 h-6" src="https://img.icons8.com/external-glyph-on-circles-amoghdesign/48/000000/external-check-education-vol-01-glyph-on-circles-amoghdesign.png">
            <span class="ml-3 text-xl" title = "Bookmark Accelerator">BA</span>
        </a>

        <span class = "ml-auto"><slot></slot></span>
    
   </div>
   
   <!-- <button on:click={refreshData} class="items-center ml-auto font-semibold bg-green-300 rounded px-2 h-8 rounded">↻🔄</button> -->
   <!-- 📂📰💾✔️✖☼🔔 -->
   <!-- https://emojicombos.com/refresh -->
</header>
   
   
   
   
   