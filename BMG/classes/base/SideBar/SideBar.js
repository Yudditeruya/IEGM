class SideBar extends React.Component {

	constructor(props) {
		super(props);
		this.state = {};

		this.close = this.close.bind(this);
	}

	close() {
		this.props._onClose();
	}

	render() {
		return (
			<div className={this.props.opened ? "cl-sidebar opened" : "cl-sidebar"}>
				<div class="cl-sidebar__menu-header">
					<div>
						<button onClick={this.close} class="cl-sidebar__close-menu">
							<i class="fal fa-times-circle"></i>
							<span>Fechar menu</span>
						</button>
					</div>
				</div>
				<div>
					<div class="cl-sidebar__title-container" style={{ padding: "0 16px" }}>
						<img class="cl-sidebar__title-logo" src="./res/img/marca_BMG.svg" />
						<span class="cl-sidebar__title-text">Business Insight</span>
					</div>
					<NavList items={this.props.navItems} orientation={"horizontal"}></NavList>
				</div>

			</div>
		)

	}
}