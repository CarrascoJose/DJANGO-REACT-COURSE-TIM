import React, {Component} from 'react';
import { useParams } from 'react-router-dom';

function withParams(Comp){
    return props => <Comp{...props} params = {useParams()}/>;
}

class Room extends Component {
    constructor(props){
        super(props);
        this.state = {
            votesToSkkip: 2,
            guestCanPause: false,
            isHost: false,
        };
        this.roomCode = this.props.params.roomCode;
        this.getRoomDetails();
        
    }

    getRoomDetails(){
        fetch('api/get-room'+'?code='+this.roomCode).then((response) => 
        response.json()
        ).then((data) => {
            this.setState({
                votesToSkip: data.votes_to_skip,
                guestCanPause: data.guest_can_pause,
                isHost: data.is_host,
            })
        })
    }

    render(){
        return <div>
                <h3>{this.roomCode}</h3>
                <p> Votes: {this.state.votesToSkkip}</p>
                <p>Guest Can Pause: {this.state.guestCanPause.toString()}</p>
                <p>Host: {this.state.isHost.toString()}</p>
                </div>
    }
}


export default withParams(Room);