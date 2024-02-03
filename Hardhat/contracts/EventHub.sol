// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract EventHub {
    // event information
    struct Event {
        address eventOwner;
        string eventImage;
        string title;
        string description;
        string date;
        string time;
        address[] members;
        uint ticketLimit;
    }

    // record of all events
    Event[] public allEvents;

    // track events by creator
    mapping (address => Event[]) public eventsByAddress;

    // create an event
    function createEvent(string memory _eventImage, string memory _title, string memory _description, string memory _date, string memory _time, uint _ticketLimit) public {
        // store the new event temporarily
        Event memory newEvent = Event(msg.sender, _eventImage, _title, _description, _date, _time, new address[](0), _ticketLimit);

        // push the event
        allEvents.push(newEvent);
        eventsByAddress[msg.sender].push(newEvent);
    } 

    // get all events
    function getAllEvents() public view returns (Event[] memory) {
        return allEvents;
    }

    // register for an event
    function registerForEvent(address _owner, uint _idx) public payable onlyParticipant(_owner) {
        require(_idx < allEvents.length, "Invalid event");

        // get the event
        Event storage selectedEvent = allEvents[_idx];
        Event storage eventByAddress = eventsByAddress[_owner][_idx];

        // // check for ticket availability
        require(selectedEvent.members.length < selectedEvent.ticketLimit, "Not enough seats available.");
        selectedEvent.members.push(msg.sender);
        eventByAddress.members.push(msg.sender);

        // // check if the amount is exactly 0.01 ether
        require(msg.value == 0.01 ether, "Please pay 0.01 ether");
        (bool sent, ) = _owner.call{value: msg.value}("");
        require(sent, "Registration Failed");
    }

    // modifiers
    modifier onlyParticipant(address _owner) {
        require(msg.sender != _owner, "The organizer cannot register for the event.");
        _;
    }
}