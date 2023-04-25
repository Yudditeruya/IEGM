class Appearance {

    static barChart = {
        default: {
            echartsOptions: {
                baseOption: {
                    label: {
                        show: false,
                    },
                    tooltip: {
                        showAxisLabel: true
                    },
                    grid: {
                        top: "20px",
                        left: 0,
                        right: 0,
                        containLabel: true
                    },
                    xAxis: {
                        type: 'category',
                        axisLine: {
                            lineStyle: {
                                color: "#7E868A"
                            }
                        },
                        axisTick: {
                            show: false
                        }
                    },
                    yAxis: {
                        splitNumber: 4,
                        axisTick: {
                            show: false
                        },
                        axisLine: {
                            show: false
                        },
                        type: 'value',
                        axisLabel: {
                            formatter: (e) => {
                                return numeral(e).format("0a");
                            },
                            color: "#7E868A"
                        }
                    },
                    dataZoom: {
                        show: true,
                        start: 0,
                        end: 100
                    },
                    color: ["#64CCD7"],
                    legend: {
                        show: false
                    },
                    orientation: "horizontal",
                    barWidth: 32
                }
            },
            clusterOptions: {
                // formats: ["0a"],
                orientation: "horizontal",
                singleBar: true,
                multicolored: true,
            }
        },
        vertical: {
            echartsOptions: {
                baseOption: {
                    label: {
                        show: true,
                        position: 'right',
                        color: '#717787'
                    },
                    grid: {
                        top: "0px",
                        bottom: "0px",
                        // left: "90px",
                        right: "130px",
                        containLabel: true
                    },
                    xAxis: {
                        show: false,
                        type: 'value',
                        axisLine: {
                            show: false
                        }
                    },
                    yAxis: {
                        type: 'category',
                        axisLine: {
                            show: false
                        },
                        axisLabel: {
                            fontSize: "10px",
                            color: "#7E868A"
                        },
                        axisTick: {
                            show: false
                        },
                        inverse: true
                    },
                    color: ["#64CCD7"],
                    legend: {
                        show: false
                    },
                    orientation: "vertical",
                    barWidth: 32
                }
            },
            clusterOptions: {
                showPercent: false,
                // formats: ["0.00%"],
                orientation: "vertical",
                singleBar: true,
                multicolored: true,
            }
        },
        verticalShowPercents: {
            echartsOptions: {
                baseOption: {
                    label: {
                        show: true,
                        position: 'right',
                        color: '#717787'
                    },
                    grid: {
                        top: "0px",
                        bottom: "0px",
                        left: "70px",
                        right: "70px",
                        containLabel: false
                    },
                    xAxis: {
                        show: false,
                        type: 'value',
                        axisLine: {
                            show: false
                        }
                    },
                    yAxis: {
                        type: 'category',
                        axisLine: {
                            show: false
                        },
                        axisLabel: {
                            color: "#7E868A"
                        },
                        axisTick: {
                            show: false
                        },
                        inverse: true
                    },
                    color: ["#64CCD7", "#9D63BB", "#4477AA"],
                    legend: {
                        show: false
                    },
                    orientation: "vertical",
                    barWidth: 32
                }
            },
            clusterOptions: {
                showPercent: true,
                // formats: ["0a", "0a"],
                orientation: "vertical",
                singleBar: true,
                multicolored: true,
            }
        },
        smallVertical: {
            echartsOptions: {
                baseOption: {
                    grid: {
                        left: 0, right: 0, top: 0, bottom: 0
                    },
                    xAxis: {
                        axisLabel: { show: false },
                        axisTick: { show: false },
                        axisLine: { show: false },
                        splitLine: { show: false },
                        type: 'value'
                    },
                    legend: {
                        show: false
                    },
                    yAxis: {
                        inverse: true,
                        splitLine: { show: false },
                        axisLabel: { show: false },
                        axisTick: { show: false },
                        axisLine: { show: false },
                        type: 'category'
                    },
                    color: ["#64CCD7", "#9D63BB", "#0BBD5A", "#ff8954"]
                }

            },
            clusterOptions: {
                // formats: ["0a", "0a"],
                orientation: "vertical",
                multicolored: true
            }
        },
        carousel: {
            echartsOptions: {
              baseOption: {
                grid: {
                  left: "0",
                  right: "0",
                  top: "0",
                  bottom: "20px"
                },
                legend: {
                  show: false
                },
                yAxis: {
                  show: false
                },
                xAxis: {
                  axisLine: {
                    lineStyle: {
                      color: "#E7E7E8"
                    }
                  },
                  axisLabel: {
                    fontSize: 9,
                    color: "#9D9FA2"
                  },
                  axisTick: {
                    show: false
                  }
                },
                label: {
                  show: false
                },
                fontFamily: "Ubuntu",
      
                axisFontSize: 10,
                chartType: "minimalist",
                zoom: false
              }
            },
            clusterOptions: {
              chartType: "minimalist",
              formats: ["0.0a"]
            }
          }
    }

    static lineChart = {
        default: {
            clusterOptions: {
                stacked: true,
                format: "0.00a",
                axisFormat: "0.0a"
            },
            echartsOptions: {
                baseOption: {
                    axisColor: "white",
                    color: ["#64CCD7", "#9D63BB", "#0BBD5A"],
                    splitNumber: 2,
                    grid: {
                        left: '5%',
                        right: '5%',
                        top: '10%',
                        bottom: '15%'
                    },
                    legend: {
                        position: 'top',
                        color: '#717787',
                        icon: "auto",
                        pageIconInactiveColor: '#aaa',
                        pageIconColor: '#2F4554',
                        pageTextStyle: {
                            color: '#333'
                        }
                    }
                }
            }
        }
    }


}