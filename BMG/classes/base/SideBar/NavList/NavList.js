var HashRouter = ReactRouterDOM.HashRouter;
var Link = ReactRouterDOM.Link;
var NavLink = ReactRouterDOM.NavLink;

class NavList extends React.Component {

	constructor(props){
		super(props);
		this.state = {
		};
	}

	componentDidMount(){
    }
    
    componentDidUpdate() {
    }

    getNavLinks() {
        if(!this.props.items) return;
        let links = [];
        let items = this.props.items;
        for(let i = 0; i < items.length; i++) {
            let item = items[i];
            if(item.name && item.path) links.push(<NavListItem item={item}></NavListItem>)
        }

        return links;
    }

	render() {
		return (
            <ul class="cl-sidebar-menu__list" style={{display: this.props.orientation == "horizontal" ? "flex" : "block"}}>
                {this.getNavLinks()}
            </ul>
		)

	}
}