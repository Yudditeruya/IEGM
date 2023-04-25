/*
    Loader component
*/

class Loader extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {};
    }

    render (){
        return <div class="app-loader-container">
            <div class="lds-ripple"><div></div><div></div></div>
        </div>;
    }
}

