class Carousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.id = Utils.generateId();
    this.paginatorId = Utils.generateId();

    this.presentation1 = {
      containerStyle: { maxHeight: "75px", height: "75px", margin: "10px 0 10px 0" },
      style: { marginTop: "10px", margin: "12px 0", maxHeight: "80px", minHeight: "80px" }
    };

  }

  componentDidMount() {
    let swiper = new Swiper("#" + this.id, {
      spaceBetween: 10,
      slidesPerView: 'auto',
      centeredSlides: true,
      pagination: {
        el: '#' + this.paginatorId,
        clickable: true,
      }
    });
  }

  render() {
    let config = this.props.jsonConfig;

    return (<div id={this.id} class="bmg-carousel swiper-container">
      <div class="swiper-wrapper">
        {/* EMPRESTIMO CONSIGNADO */}
        <div class="swiper-slide">
          <div class={"date-container"}>
            <TextObject app={this.props.app} className={"date-text"} objectId={config.consignado.data}></TextObject>
            <div class="date-load">
              {/* <span>Última atualização:</span> */}
              <TextObject app={this.props.app} className={"date-last-update"} objectId={config.consignado.dataAtualizacao}></TextObject>
            </div>
          </div>
          <CardCarousel title={"Consigned Loan"} icon={<i class="fal fa-hand-holding-usd"></i>}>
            <div className="carousel-main-kpi">
              <CustomKpi app={this.props.app} objectId={config.consignado.primeiroKPI} className="bmg-main-kpi"></CustomKpi>
              <CustomKpi app={this.props.app} objectId={config.consignado.variacao} className="bmg-tiny-kpi"></CustomKpi>
            </div>

            <CustomKpi app={this.props.app} objectId={config.consignado.segundoKPI} reverse={false} className="carousel-mid-kpi bmg-main-kpi kpi-small"></CustomKpi>
            <BarChart className="bar-home" app={this.props.app} objectId={config.consignado.graficoBarra} style={this.presentation1.style} containerStyle={this.presentation1.containerStyle} options={Appearance.barChart.carousel}></BarChart>
            <div class="bmg-bottom-carousel">
              <Link to={"/consigned-loan/"} class="bmg-button-detail">VER DETALHES</Link>
            </div>
          </CardCarousel>
        </div>

        {/* CARTOES */}
        <div class="swiper-slide">
          <div class={"date-container"}>
            <TextObject app={this.props.app} className={"date-text"} objectId={config.cartoes.data}></TextObject>
            <div class="date-load">
              {/* <span>Última atualização:</span> */}
              <TextObject app={this.props.app} className={"date-last-update"} objectId={config.cartoes.dataAtualizacao}></TextObject>
            </div>
          </div>
          <CardCarousel title={"Cards"} icon={<i class="fal fa-credit-card"></i>}>
            <div className="carousel-main-kpi">
              <CustomKpi app={this.props.app} objectId={config.cartoes.primeiroKPI} className="bmg-main-kpi"></CustomKpi>
              <CustomKpi app={this.props.app} objectId={config.cartoes.variacao} className="bmg-tiny-kpi"></CustomKpi>
            </div>

            <CustomKpi app={this.props.app} objectId={config.cartoes.segundoKPI} reverse={false} className="carousel-mid-kpi bmg-main-kpi kpi-small"></CustomKpi>
            <BarChart className="bar-home" app={this.props.app} objectId={config.cartoes.graficoBarra} style={this.presentation1.style} containerStyle={this.presentation1.containerStyle} options={Appearance.barChart.carousel}></BarChart>
            <div class="bmg-bottom-carousel">
              <Link to={"/cartoes/"} class="bmg-button-detail">VER DETALHES</Link>
            </div>
          </CardCarousel>
        </div>


        {/*CREDITO EM CONTA */}
        <div class="swiper-slide">
          <div class={"date-container"}>
            <TextObject app={this.props.app} className={"date-text"} objectId={config.creditoEmConta.data}></TextObject>
            <div class="date-load">
              {/* <span>Última atualização:</span> */}
              <TextObject app={this.props.app} className={"date-last-update"} objectId={config.creditoEmConta.dataAtualizacao}></TextObject>
            </div>
          </div>
          <CardCarousel title={"Account Balance"} icon={<i class="fal fa-chart-line"></i>}>
            <div className="carousel-main-kpi">
              <CustomKpi app={this.props.app} objectId={config.creditoEmConta.primeiroKPI} className="bmg-main-kpi"></CustomKpi>
              <CustomKpi app={this.props.app} objectId={config.creditoEmConta.variacao} className="bmg-tiny-kpi"></CustomKpi>
            </div>

            <CustomKpi app={this.props.app} objectId={config.creditoEmConta.segundoKPI} reverse={false} className="carousel-mid-kpi bmg-main-kpi kpi-small"></CustomKpi>
            <BarChart className="bar-home" app={this.props.app} objectId={config.creditoEmConta.graficoBarra} style={this.presentation1.style} containerStyle={this.presentation1.containerStyle} options={Appearance.barChart.carousel}></BarChart>
            <div class="bmg-bottom-carousel">
              <Link to={"/account-balance/"} class="bmg-button-detail">VER DETALHES</Link>
            </div>
          </CardCarousel>
        </div>


        {/* BANCO DIGITAL */}
        <div class="swiper-slide">
          <div class={"date-container"}>
            <TextObject app={this.props.app} className={"date-text"} objectId={config.bancoDigital.data}></TextObject>
            <div class="date-load">
              {/* <span>Última atualização:</span> */}
              <TextObject app={this.props.app} className={"date-last-update"} objectId={config.bancoDigital.dataAtualizacao}></TextObject>
            </div>
          </div>
          <CardCarousel title={"Digital Bank"} icon={<i class="fal fa-mobile-android-alt"></i>}>
            <div className="carousel-main-kpi">
              <CustomKpi app={this.props.app} objectId={config.bancoDigital.primeiroKPI} className="bmg-main-kpi"></CustomKpi>
              <CustomKpi app={this.props.app} objectId={config.bancoDigital.variacao} className="bmg-tiny-kpi"></CustomKpi>
            </div>

            <CustomKpi app={this.props.app} objectId={config.bancoDigital.segundoKPI} reverse={false} className="carousel-mid-kpi bmg-main-kpi kpi-small"></CustomKpi>
            <BarChart className="bar-home" app={this.props.app} objectId={config.bancoDigital.graficoBarra} style={this.presentation1.style} containerStyle={this.presentation1.containerStyle} options={Appearance.barChart.carousel}></BarChart>
            <div class="bmg-bottom-carousel">
              <Link to={"/digital-bank/"} class="bmg-button-detail">VER DETALHES</Link>
            </div>
          </CardCarousel>
        </div>


        {/* SEGUROS */}
        <div class="swiper-slide">
          <div class={"date-container"}>
            <TextObject app={this.props.app} className={"date-text"} objectId={config.seguros.data}></TextObject>
            <div class="date-load">
              {/* <span>Última atualização:</span> */}
              <TextObject app={this.props.app} className={"date-last-update"} objectId={config.seguros.dataAtualizacao}></TextObject>
            </div>
          </div>
          <CardCarousel title={"Insurance"} icon={<i class="fal fa-hands-usd"></i>}>
            <div className="carousel-main-kpi">
              <CustomKpi app={this.props.app} objectId={config.seguros.primeiroKPI} className="bmg-main-kpi"></CustomKpi>
              <CustomKpi app={this.props.app} objectId={config.seguros.variacao} className="bmg-tiny-kpi"></CustomKpi>
            </div>

            <CustomKpi app={this.props.app} objectId={config.seguros.segundoKPI} className="carousel-mid-kpi bmg-main-kpi kpi-small"></CustomKpi>
            <BarChart className="bar-home" app={this.props.app} objectId={config.seguros.graficoBarra} style={this.presentation1.style} containerStyle={this.presentation1.containerStyle} options={Appearance.barChart.carousel}></BarChart>
            <div class="bmg-bottom-carousel">
              <Link to={"/Insurance/"} class="bmg-button-detail">VER DETALHES</Link>
            </div>
          </CardCarousel>
        </div>


      </div>
      <div id={this.paginatorId} class="swiper-pagination"></div>
    </div>);
  }
}