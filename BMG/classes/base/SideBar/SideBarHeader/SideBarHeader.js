class SideBarHeader extends React.Component {

	constructor(props){
		super(props);
	}

	render() {
		return (
			<div class="cl-sidebar__menu-header">
				<div>
					<button class="cl-sidebar__close-menu"><i class="fal fa-times-circle"></i><span>Fechar menu</span></button>
				</div>
			</div>
		)

	}
}