<div class="input-icon-wrap">
    <input :type = {type || 'text'} class="input-with-icon p-1" id="form-name" on:keyup={({ target: { value } }) => debounce(value)} placeholder={value} />
    <!-- <span class="input-icon">🔍 </span> -->
</div>  	
  
<script>
    export let type, value

	let val='';
	let timer;

	const debounce = v => {
		clearTimeout(timer);
		timer = setTimeout(() => {
			value = v;
		}, 750);
	}
</script>

<style>
  .input-icon-wrap {
    border: 1px solid #ddd;    
    display: flex;
    flex-direction: row;
    border-radius: 4px;;
  }
  
  .input-icon {
    background: rgba(221, 221, 221, 0.423);
  }
  
  .input-with-icon {
    border: none;
    flex: 1;
  }
  
  .input-icon, .input-with-icon {
    padding: 3px;
  }
</style>