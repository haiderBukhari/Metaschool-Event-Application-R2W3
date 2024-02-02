// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract DeTicket {
    // event information
    struct Event {
        string name;
        string description;
        address[] members;
        uint ticketLimit;
    }

    // member information

    // record of all events
    Event[] public allEvents;

    // track events by creator
    mapping(address => Event[]) public eventsByAddress;

    // create an event
    function createEvent(
        string memory _name,
        string memory _description,
        uint _ticketLimit
    ) public {
        // store the new event temporarily
        Event memory newEvent = Event(
            _name,
            _description,
            new address[](0),
            _ticketLimit
        );

        // push the event
        allEvents.push(newEvent);
        eventsByAddress[msg.sender].push(newEvent);
    }

    // get all events
    function getAllEvents() public view returns (Event[] memory) {
        return allEvents;
    }

    // register for an event
    function registerForEvent(address _owner, uint _idx) public payable {
        require(
            msg.sender != _owner,
            "The organizer cannot register to the event"
        );
        require(_idx < eventsByAddress[_owner].length, "Invalid index");

        // store the selected event temporarily
        Event storage selectedEvent = eventsByAddress[_owner][_idx];

        // check if the amount is exactly 0.01 ether
        require(msg.value == 0.01 ether, "Please pay 0.01 ether");
        (bool sent, ) = _owner.call{value: msg.value}("");
        require(sent, "Registration Failed");

        // check for ticket availability
        require(
            selectedEvent.members.length < selectedEvent.ticketLimit,
            "Not enough tickets"
        );
        selectedEvent.members.push(msg.sender);
    }

    // get the member addresses of a specific event
    function getEventMembers(
        address _owner,
        uint _idx
    ) public view returns (address[] memory) {
        Event storage selectedEvent = eventsByAddress[_owner][_idx];
        return selectedEvent.members;
    }
}