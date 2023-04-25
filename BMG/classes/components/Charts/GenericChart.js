/*
    GenericChart - Cria um gráfico Echarts recebendo uma options genérica
    Props:
        options - options do echarts
        style - style para aplicar na div criada
*/


class GenericChart extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.chart = {};
        this.ref = React.createRef();
        this.id = Utils.generateId();
        this.hasResizeEvent = false;
        this.watchResize = null;
    }

    componentDidMount() {
        this.renderChart();
        this.setResizeListener();
    }

    componentWillUnmount() {
        // removeResizeListener(this.ref.current, this.chart.resize);
        this.watchResize.removeListener();
    }

    componentDidUpdate() {
        this.renderChart();
        // this.resize();
    }

    renderChart() {
        let element = document.getElementById(this.id);
        if (element) {
            this.chart = echarts.init(element);
            this.chart.on('finished', () => {
                if (this.props.onFinished) this.props.onFinished(this.chart);
            })
            this.chart.setOption(this.props.options, true);
        }
    }

    setResizeListener() {


        if (this.hasResizeEvent) return;

        this.hasResizeEvent = true;
        this.watchResize = new WatchElementResize([this.id]);
        this.watchResize.on('resize', (evt) => {

            this.chart.resize();
            // the DOM element
            var resized_element = evt.element.target;

            // the element offset (width, height, top, left) 
            var offset = evt.element.offset;

            // the window dimensions -- just in case you need
            var window_size = evt.window;
        });


    }

    render() {
        var style = this.props.style || { backgroundColor: '#eee', height: '100%', width: '100%', display: "flex", alignItems: "center", justifyContent: "center" };
        return <div ref={this.ref} id={this.id} style={style}></div>;
    }
}
