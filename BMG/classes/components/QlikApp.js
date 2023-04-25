class QlikApp extends React.Component {

  constructor(props){
    super(props);
    this.state = {};
  }

  componentDidMount(){
      this.openQlikConnection();
  }

  openQlikConnection(){
      let app = this.props.qlik.openApp( this.props.appId, config );
      this.props._onOpen(app);
  }

  render() {
    return "";
  }
}
