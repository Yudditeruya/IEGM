class ErrorPage extends React.Component {

	constructor(props) {
		super(props);
	}

	reloadPage() {
		window.location.reload();
	}

	render() {
		const defaultMessage = "Erro Desconhecido"
		return (
			<div class="errorPage">
				<div class="title">
					O acesso ao painel apresentou o seguinte erro:
				</div>
				<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
					<div class="errorMessage">
						{this.props.errorMessage ? this.props.errorMessage : defaultMessage} 
					</div>
					<button onClick={this.reloadPage.bind(this)} class="errorButton">Recarregar Página</button>
				</div>
			</div>
		)
	}


}