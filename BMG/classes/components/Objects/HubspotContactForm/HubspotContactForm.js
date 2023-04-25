class HubspotContactForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
  }
  componentDidMount() {
    window.localStorage.getItem("cluster-form-submitted") === "true"
      ? console.log("")
      : setTimeout(() => {
          this.setState({ show: true });
        }, 30000);
    const script = document.createElement("script");
    script.src = "https://js.hsforms.net/forms/v2.js";
    document.body.appendChild(script);

    script.addEventListener("load", () => {
      if (window.hbspt) {
        window.hbspt.forms.create({
          region: "na1",
          portalId: "20041319",
          formId: "9923b6c8-4138-4400-a137-5e02264d3805",
          target: "#hubspotForm",
          onFormSubmitted: function ($form) {
            setTimeout(() => {
              document
                .getElementById("hb-modal")
                .classList.remove("show-modal");
              document.getElementById("hb-modal").classList.add("hide-modal");
              window.localStorage.setItem("cluster-form-submitted", "true");
            }, 2000);
          },
        });
      }
    });
  }

  render() {
    return (
      <div
        id="hb-modal"
        className={`${this.state.show ? "show-modal" : "hide-modal"}`}
      >
        <div className="overlay"></div>
        <div className="modal-hubspot">
          <div className="modalHubSpotWrapper firstModal">
            <div className="headerWrapperModalHubSpot">
              <span>Custom Qlik Sense Mashup - LIVE DEMO</span>
            </div>
          </div>
          <div className="bodyModalHubSpot">
            <span className="modalText">
              Please provide a valid commercial email to continue:
              <br />
              <br />
            </span>
            <div id="hubspotForm"></div>
          </div>
        </div>
      </div>
    );
  }
}
