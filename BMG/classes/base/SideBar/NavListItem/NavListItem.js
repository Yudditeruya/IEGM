var HashRouter = ReactRouterDOM.HashRouter;
var Link = ReactRouterDOM.Link;
var NavLink = ReactRouterDOM.NavLink;

class NavListItem extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<li class={`cl-sidebar-menu__item 
      ${this.props.item.name === 'Cards' || 
      this.props.item.name === 'Digital Bank' ||
      this.props.item.name === 'Insurance'
      ?
      'disabled'
      :
      ''}`}>
				<NavLink activeClassName="active" to={this.props.item.path}>
					<i className={this.props.item.icon}></i>
					<span>{this.props.item.name}</span>
				</NavLink>
			</li>

		)

	}
}