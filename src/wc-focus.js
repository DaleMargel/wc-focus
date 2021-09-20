let template = document.createElement('template');
template.innerHTML = `
<style>
div {
	color: var(--outline_color,DodgerBlue);
	border:solid;
	border-radius: 4px;
	position: absolute;
	transition: 0.25s;
}
.hidden { display:none }
</style>
<div class="hidden"></div>
<slot></slot>
`;
const margin = 4;
class WcFocus extends HTMLElement {
	constructor(){ super();
		const shadowRoot = this.attachShadow({mode: 'open'});
		shadowRoot.appendChild(template.content.cloneNode(true));
	}
	connectedCallback() {
		this.addEventListener('focusin', e => {
			if(this.timer) clearTimeout(this.timer);
			this.timer = null;

			let rect = e.target.getBoundingClientRect();
			let focus = this.shadowRoot.querySelector('div');
			focus.classList.remove('hidden');
			focus.style.left = `${rect.left-margin}px`;
			focus.style.top = `${rect.top-margin}px`;
			focus.style.width = `${rect.width+margin-1}px`;
			focus.style.height = `${rect.height+margin-1}px`;
		});
		this.addEventListener('focusout', e => {
			this.timer = setTimeout(()=>{
				let focus = this.shadowRoot.querySelector('div');
				focus.classList.add('hidden');
			}, 100);
		});
	}
	timer = null;
}
try{ customElements.define("wc-focus",WcFocus) }
catch(NotSupportedError){/* duplicate */}

export { WcFocus }
// Code: Copyright © 2021 Dale Margel / Azure Solutions
// under Creative Commons - Attribution-NonCommercial CC BY-NC
// Build 2021.08.07
// Use at your own risk
