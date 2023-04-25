/*
	NativeQlikObject - Cria um gráfico do Qlik com base em um ID
	Props:
		app - referência do objeto app do qlik
		qlikId - Id do gráfico no qlik
		noSelections (default false) - Se for true desabilita a seleção do gráfico e da filtragem nele
		style - style para aplicar na div criada
		height (default 300) - Valor do height da div (Se for em numero será considerado px, mas aceita tambem string ex: '100%')
*/

class NativeQlikObject extends React.Component {

	constructor(props) {
		super(props);
		this.state = { expanded: false };
		this.id = Utils.generateId();
	}

	componentDidMount() {
		var me = this;
		var options = {};
		if (this.props.noSelections) {
			options.noSelections = true;
		}
		this.props.app.getObject(this.id, this.props.qlikId, options);
		this.props.app.visualization.get(this.props.qlikId).then(model => {

			me.setState({ model });
		});
	}


	componentDidUpdate(prevProps, prevState) {
		var me = this;
		if (prevProps.qlikId != this.props.qlikId) {
			if (this.state.model) {
				this.state.model.close();
			}
			var options = {};
			if (this.props.noSelections) {
				options.noSelections = true;
			}
			this.props.app.visualization.get(this.props.qlikId).then(model => {
				model.show(this.id);
				me.setState({ model })
			});
		}
	}

	componentWillUnmount() {
		if (this.state.model) {
			this.state.model.close();
		}
	}


	render() {
		var height = this.props.height || 300
		let style;
		let styleChart;

		styleChart = this.props.style || {};
		styleChart.height = height;
		styleChart.marginTop = 10;
		style = {
			display: 'flex',
			flexDirection: 'column',
			position: 'relative',
			boxShadow: 'inset 0 -1px 0 0 rgba(24,42,89,0.15)'
		};




		return <div style={style}>
			<div style={styleChart} className={this.props.className} id={this.id} />
		</div>;
	}
}