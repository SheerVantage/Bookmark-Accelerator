// https://svelte.dev/repl/ffaacf4479e043dd9b21ba29fe96d2df?version=3.23.2

let hoverstamp
let ifrm
let currentHref
let scheduled;
export function preview(node, options = {delay: 1000}) {
		const href = node.href
		const delay = options.delay || 1000
		if (!href) return // no href
		function listener() {
			if(scheduled) {
				clearTimeout(scheduled);
				scheduled = null;
			}
			if (ifrm) {
				console.log({currentHref})
				if (currentHref && (currentHref !== href)) ifrm.remove()
				else return
			}
			hoverstamp = null;
			ifrm = document.createElement("iframe");
			ifrm.setAttribute("src", href);
			currentHref = href
			ifrm.setAttribute("frameborder", 0);
			ifrm.className = 'iframestyle'
			node.appendChild(ifrm);
		}
		function remove() {
			const isRecentlyHovered = Date.now() > (hoverstamp + options.delay)
			console.log({isRecentlyHovered})
			if (ifrm) {
				if (isRecentlyHovered) {
					ifrm.remove()
					ifrm = null
					currentHref = undefined
				} else {
					if(scheduled) {
						clearTimeout(scheduled);
					}
					scheduled = setTimeout(remove, 100)
				}
			}
		}
		function remover() {
			hoverstamp = Date.now()
			if(scheduled) {
				clearTimeout(scheduled);
			}
			scheduled = setTimeout(remove, 100)
		}
		node.addEventListener('mouseenter', listener)
		node.addEventListener('mouseleave', remover)
		return {
			destroy() {
				remover()
			}
		};
	}