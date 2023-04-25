class ClusterGauge extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.id = Utils.generateId();
  }

  getData() {
    this.promises = [];
    this.createPromiseChain();
    Promise.all(this.promises).then((data) => {
      this.formatGaugeData(data);
    })
  }

  formatGaugeData(data) {
    let newData = [];
    newData = data.sort((a, b) => (a.order > b.order) ? 1 : -1);
    this.setState({ data: newData });
  }

  createCube(definition, order, vis) {
    return new Promise((resolve, reject) => {
      this.props.app.createCube(definition).then((data) => {
        resolve({ data: data.layout.qHyperCube.qDataPages[0], order: order, vis: vis.model.layout });
      })
    })
  }

  createPromiseChain() {
    for (let i = 0; i < this.hcDefinitions.length; i++) {
      this.promises.push(this.createCube(this.hcDefinitions[i].definition, this.hcDefinitions[i].order, this.hcDefinitions[i].vis));
    }
  }

  getHypercubeDefinitions() {
    let app = this.props.app;
    return new Promise((resolve, reject) => {
      let definitions = [];
      let counter = 0;
      for (let i = 0; i < this.props.gaugeIds.length; i++) {
        let gaugeId = this.props.gaugeIds[i];
        let order = i;
        app.visualization.get(gaugeId).then((vis) => {
          vis.model.getProperties().then((properties) => {
            counter++;
            definitions.push({ id: gaugeId, definition: properties.qHyperCubeDef, order: order, vis: vis });
            if (counter == this.props.gaugeIds.length) {
              this.hcDefinitions = definitions;
              resolve(definitions);
            }
          })
        })
      }
    })
  }

  generateOption() {
    if (!this.state.data) {
      return {};
    }

    let serie;
    let series = [];
    let totalRadius = 80;
    for (let i = 0; i < this.state.data.length; i++) {
      let currentGauge = this.state.data[i];
      let value = currentGauge.data.qMatrix[0][0].qNum * 100;
      let min = currentGauge.vis.measureAxis.min != 0 ? currentGauge.vis.measureAxis.min * 100 : 0;
      let max = currentGauge.vis.measureAxis.max != 0 ? currentGauge.vis.measureAxis.max * 100 : 0;
      let color = [];
      let radius = 0;
      if (i == 0) {
        radius = totalRadius;
        color = [
          [value / max, value / 100 > 70 ? 'goldenrod' : 'green'],
          [1, "#e7e7e8"]
        ];

        let colorIndex = null;
        if(currentGauge.vis.segmentInfo && currentGauge.vis.segmentInfo.limits && currentGauge.vis.segmentInfo.limits.length) {
          for(let j = 0; j < currentGauge.vis.segmentInfo.limits.length ; j++) {
            if(value < currentGauge.vis.segmentInfo.limits[j].value * 100) {
              colorIndex = j;
            }
          }
          if(!colorIndex && colorIndex != 0) {
            colorIndex = currentGauge.vis.segmentInfo.paletteColors.length-1;
          }currentGauge.data.qMatrix[0][0].qNum * 100

          color[0] = [value / max, currentGauge.vis.segmentInfo.paletteColors[colorIndex].color];
        }

      } else {
        if(i == 1) {
          radius = totalRadius - (12*i);
        } else {
          radius = totalRadius - (10*i);
        }
        color = [
          [value / max, currentGauge.vis.paletteProgressColor.color]
        ];
      }

      serie = {
        type: "gauge",
        radius: radius+ '%',
        min: min,
        max: max,
        startAngle: 225,
        endAngle: -45,
        data: [{
          value: value,
        }],
        center: ["50%", "65%"],
        axisLine: {
          "lineStyle": {
            "color": color,
            "width": i == 0 ? 12 : 7
          }
        },
        splitNumber: 4,
        axisLabel: {
          show: i == 0,
          distance: -53,
          color: "grey"
        },
        "axisTick": { show: false },
        "splitLine": { show: false },
        "itemStyle": { show: false },
        "detail": {
          "formatter": function (value) {
            if (value != 0) {
              var num = Math.round(value * 10) / 10;
              return parseFloat(num).toFixed(1) + "%";
            } else {
              return 0;
            }
          },
          show: i == 0,
          "textStyle": {
            fontSize: 20,
            fontWeight: '700',
            "color": "black"
          }
        },
        title: {
          "offsetCenter": [0, "100%"]
        },
        pointer: {
          show: i == 0,
          length: '50%',
          width: 4,
        }
      };

      series.push(serie);
    }

    let option = {
      series: series
    };

    return option;
  }

  componentDidMount() {
    this.props.app.createCube({
      "qDimensions": [],
      "qMeasures": [{
          "qDef": {
            "qDef": "=1+1"
          }
      }]
    }, () => {
      this.getHypercubeDefinitions().then(() => {
        this.getData();
      });
    })
  }

  onFinished() {
  }

  render() {
    let styleChart = this.props.containerStyle || { height: "242px", width: "281px", margin: "0 auto" };
    let option = {} 
    if(this.state.data) {
      option = this.generateOption();
    };

    return option.series ? <GenericChart onFinished={this.onFinished.bind(this)} style={styleChart} options={option} /> : '';
  }
}