class NavBar extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <nav className="navbar" role="navigation" aria-label="main navigation">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <button className="burger-menu" onClick={this.props._onClick}>
                        <i class="far fa-bars"></i>
                    </button>
                    <div className="brand-wrapper custom-font">
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <span className="navbar__app-title">{this.props.activeNav ? this.props.activeNav.alias || this.props.activeNav.name : "..."}</span>
                            {this.props.app && this.props.dateObject ?
                                <TextObject app={this.props.app} className={"info-text"} objectId={this.props.dateObject}></TextObject>
                                :
                                ''
                            }
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            {this.props.app && this.props.lastUpdateObject ?
                                <TextObject app={this.props.app} className={"update-text"} objectId={this.props.lastUpdateObject}></TextObject>
                                :
                                ''
                            }
                        </div>
                    </div>
                    <RightSideBar props={this.props.props} _onClickRightSideBar={this.props._onClickRightSideBar} showRightSideBar={this.props.showRightSideBar} app={this.props.app} />
                </div>
            </nav>
        )
    }
}


