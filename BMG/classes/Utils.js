class Utils {

    static generateId() {
        return "id_" + new Date().getTime() + (Math.random() * 100).toFixed(0);
    }

    static getEnvironment() {
        switch (window.location.hostname) {
            case "localhost":
                return "dev";
            case "dev.clusterdesign.com.br":
                return "cluster";
            default:
                return "prod";
        }
    }

    static extractData(hypercube, type) {
        return new Promise((resolve, reject) => {
            let series = [];
            let labels = [];
            let legends = [];
            const subNodesLabels = [];
            let hasLabel = null;
            hypercube = hypercube.qHyperCube;
            switch (type) {
                case "stacked":
                    if (hypercube.qError) {
                        resolve({
                            series: [],
                            labels: [],
                            errorMessage: hypercube.qError
                        })
                    }
                    (hypercube.qStackedDataPages[0].qData[0] || { qSubNodes: [] }).qSubNodes.forEach(
                        (r, i) => {
                            if (labels.indexOf(r.qText) < 0) {
                                labels.push(r.qText);
                            }

                            hasLabel = r.qSubNodes.length > 1 ? false : true;

                            (r.qSubNodes || []).forEach((line, lineId) => {
                                if (subNodesLabels.indexOf(line.qText) < 0) {
                                    subNodesLabels.push(line.qText);
                                }
                                if (!series[subNodesLabels.indexOf(line.qText)]) {
                                    series[subNodesLabels.indexOf(line.qText)] = {
                                        name: line.qText,
                                        type: 'line',
                                        stack: '',
                                        label: {
                                            normal: {
                                                show: hasLabel,
                                                fontSize: 11,
                                                position: 'top',
                                                color: "#000",
                                                formatter: (res) => {
                                                    return res.data.name;
                                                }
                                            }
                                        },
                                        data: []
                                    };
                                }
                                legends.push(line.qSubNodes[0].qText);
                                series[subNodesLabels.indexOf(line.qText)].data[i] = { value: line.qSubNodes[0].qValue, name: line.qSubNodes[0].qText };
                            })
                        })
                    break;
                default:
                    if (hypercube.qError) {
                        resolve({
                            series: [],
                            labels: [],
                            errorMessage: hypercube.qError
                        })
                    }

                    hypercube.qMeasureInfo.map((measure, index) => {

                        // GETTING COLORS
                        let hasColorExpression;
                        let colorAttributeIndex;
                        for (let i = 0; i < measure.qAttrExprInfo.length; i++) {
                            let item = measure.qAttrExprInfo[i];
                            if (item.id == "colorByExpression") {
                                hasColorExpression = true;
                                colorAttributeIndex = i;
                            }
                        }

                        let total = hypercube.qGrandTotalRow[index];


                        series.push({
                            name: measure.qFallbackTitle,
                            data: hypercube.qDataPages[0].qMatrix.map((item) => {
                                let mappedData = {};
                                if (item[hypercube.qDimensionInfo.length + index].qNum == measure.qMin) { mappedData.isMin = true }
                                if (item[hypercube.qDimensionInfo.length + index].qNum == measure.qMax) { mappedData.isMax = true }

                                if(hypercube.qDimensionInfo.length > 0) {
                                    mappedData.valueInPercent = numeral(item[index + 1].qNum / total.qNum).format('0.00%');
                                }

                                mappedData.name = item[hypercube.qDimensionInfo.length + index].qText;
                                mappedData.value = item[hypercube.qDimensionInfo.length + index].qNum;
                                if (hasColorExpression) {
                                    mappedData.qlikColor = item[hypercube.qDimensionInfo.length + index].qAttrExps.qValues[colorAttributeIndex].qText;
                                }
                                return mappedData;
                            })
                        })
                    });
                    labels = hypercube.qDataPages[0].qMatrix.map((item) => { return item[0].qText });
                    break;
            }


            resolve({
                series: series,
                labels: labels
            })
        })
    }

    static extractPieChartData(hypercube) {
        return new Promise((resolve, reject) => {
            let series = [];
            let labels = [];
            hypercube = hypercube.qHyperCube;

            if (hypercube.qError) {
                resolve({
                    series: [],
                    labels: [],
                    errorMessage: hypercube.qError
                })
            }

            hypercube.qMeasureInfo.map((measure, index) => {
                let total = hypercube.qGrandTotalRow[index];
                series.push({
                    name: measure.qFallbackTitle,
                    data: hypercube.qDataPages[0].qMatrix.map((item) => {
                        let mappedData = {};
                        if(hypercube.qDimensionInfo.length > 0) {
                            mappedData.valueInPercent = numeral(item[index + 1].qNum / total.qNum).format('0.00%');
                        }
                        mappedData.name = item[0].qText;
                        mappedData.value = item[hypercube.qDimensionInfo.length + index].qNum;
                        return mappedData;
                    })
                })
            });
            labels = hypercube.qDataPages[0].qMatrix.map((item) => { return item[0].qText });

            resolve({
                series: series,
                labels: labels
            })
        })
    }


    static getFormattedNumber(number, format) {
        return numeral(number).format(format);
    }

    static getColorByLimit(value, limits, colors) {
        var limitValue = null;
        for (var i = 0; i <= limits.length; i++) {
            if (limits[i]) {
                limitValue = limits[i].value;
                if (value < limitValue) {
                    return colors[i];
                    break;
                }
                if (value > limitValue && !limits[i + 1]) {
                    return colors[colors.length - 1];
                }
            }
        }
    }

    static extractKPIData(hypercube) {
        return new Promise((resolve, reject) => {
            let series = [];
            hypercube = hypercube.qHyperCube;
            for (let i = 0; i < hypercube.qMeasureInfo.length; i++) {
                let measure = hypercube.qMeasureInfo[i];
                let measureTitle = measure.qFallbackTitle;
                let item = hypercube.qDataPages[0].qMatrix[0][i];
                let color = null;

                if (measure.conditionalColoring && measure.conditionalColoring.segments) {
                    let limits = measure.conditionalColoring.segments.limits;
                    let colors = measure.conditionalColoring.segments.paletteColors;
                    if (limits && colors) {
                        let value = item.qNum;
                        color = this.getColorByLimit(value, limits, colors);
                    }
                }

                series.push({
                    name: measureTitle,
                    data: { name: item.qText, value: item.qNum, color: color }
                })
            }
            resolve({
                series: series
            })
        })
    }

    static destroyHC(app, hc, model) {
        try {
            app.destroySessionObject(hc.qInfo.qId);
            if (model) model.close();
        } catch (err) {
            throw new Error(err);
        }
    }

    static isLight(color) {
        const hex = color.replace('#', '');
        const c_r = parseInt(hex.substr(0, 2), 16);
        const c_g = parseInt(hex.substr(2, 2), 16);
        const c_b = parseInt(hex.substr(4, 2), 16);
        const brightness = ((c_r * 299) + (c_g * 587) + (c_b * 114)) / 1000;
        return brightness > 200;
    }


    // FORMATS
    /*
    U or UNKNOWN
    A or ASCII
    I or INTEGER
    R or REAL
    F or FIX
    M or MONEY
    D or DATE
    T or TIME
    TS or TIMESTAMP
    IV or INTERVAL */
    static generateHypercube(app, stacked, dimensions, measures, callback) {

        if (stacked) {
            let measureTotal = "=";

            for (var i = 0; i < measures.length; i++) {
                if (i + 1 == measures.length) {
                    measureTotal += "(" + measures[i].definition + ")"
                } else {
                    measureTotal += "(" + measures[i].definition + ") + "
                }
            }

            measures.push(
                { definition: measureTotal, label: "Total", format: { expression: measures[0].format.expression, type: measures[0].format.type } },
            );
        }

        let hcDef = {
            qStateName: "",
            qPopulateMissing: false,
            qDimensions: dimensions.map((dimension) => {
                return {
                    "qDef": {
                        "qFieldDefs": [dimension]
                    }
                }
            }),
            qMeasures: measures.map((measure) => {
                return {
                    "qDef": {
                        "qDef": measure.definition,
                        "qNumFormat": {
                            "qType": measure.format && measure.format.type ? measure.format.type : "R",
                            "qFmt": measure.format && measure.format.expression ? measure.format.expression : "##.#",
                        },
                        "qLabel": measure.label
                    }
                }
            }),
            qInterColumnSortOrder: [0, 1],
            qMode: stacked ? "K" : "S",
            qInitialDataFetch: [
                {
                    "qHeight": 500,
                    "qLeft": 0,
                    "qTop": 0,
                    "qWidth": 10
                }
            ],
            qSupressZero: true,
            qSuppressMissing: true,
            customErrorMessage: {
                calcCond: ""
            }
        };
        app.createCube(hcDef, callback);
    }

    static evaluateExpression(app, expression) {
        return new Promise((resolve, reject) => {
            if (!expression) resolve('');
            if (expression.indexOf('=') != 0) resolve(expression);
            app.model.evaluateExpression(expression).then((data) => {
                resolve(data);
            });
        })
    }

    static onDataChanged(app, callback) {
        let fromCreation = true;
        app.createCube({ "qMeasures": [{ "qDef": { "qDef": "=1+1" } }] }, () => {
            if (fromCreation == true) {
                fromCreation = false;
            } else {
                callback();
            }
        });
    }

    static createHyperCubeByQlikId(app, qlikId, callback) {
        app.visualization.get(qlikId).then(visualizationModel => {
            visualizationModel.model.getProperties().then(data => {
                let title = data.title.qStringExpression ? data.title.qStringExpression.qExpr : data.title;
                if (data.qHyperCubeDef.qInitialDataFetch && data.qHyperCubeDef.qInitialDataFetch[0]) {
                    var columnsNum = data.qHyperCubeDef.qInterColumnSortOrder.length;
                    data.qHyperCubeDef.qInitialDataFetch[0].qWidth = columnsNum;
                    data.qHyperCubeDef.qInitialDataFetch[0].qHeight = Math.floor(10000 / columnsNum);
                }

                data.qHyperCubeDef.qShowTotalsAbove = true;
                function getTitle(hcData) {
                    if (title.indexOf('=') == 0) {
                        app.model.evaluateExpression(title).then(callback.bind(this, hcData, visualizationModel))
                    } else {
                        callback(hcData, visualizationModel, title)
                    }
                }
                app.createCube(data.qHyperCubeDef, getTitle);
            })
        });
    }

}