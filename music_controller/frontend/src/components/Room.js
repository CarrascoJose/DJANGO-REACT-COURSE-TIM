import React, {Component} from 'react';
import { useParams } from 'react-router-dom';

function withParams(Comp){
    return props => <Comp{...props} params = {useParams()}/>;
}

class Room extends Component {
    constructor(props){
        super(props);
        this.state = {
            votes_to_skip: 2,
            guest_can_pause: false,
            isHost: false,
        };
        this.roomCode = this.props.params.roomCode;
        this.getRoomDetails();
        
    }

    getRoomDetails(){
        fetch('/api/get-room'+'?code='+this.roomCode).then((response) => 
        response.json()
        ).then((data) => {
            this.setState({
                votes_to_skip: data.votes_to_skip,
                guest_can_pause: data.guest_can_pause,
                isHost: data.is_host,
            })
        })
    }

    render(){
        return <div>
                <h3>{this.roomCode}</h3>
                <p> Votes: {this.state.votes_to_skip}</p>
                <p>Guest Can Pause: {this.state.guest_can_pause.toString()}</p>
                <p>Host: {this.state.isHost.toString()}</p>
                </div>
    }
}


export default withParams(Room);