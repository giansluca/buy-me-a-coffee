// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// deployed on goerli at: 0x3a79aE80a686DDDb3Cc5e475fb45e7a89d3A66Ee 

contract BuyMeACoffee {
    // Event to emit when a memo is created
    event NewMemo(
        address indexed from,
        uint256 timestamp,
        string name,
        string message
    );

    // Memo struct
    struct Memo {
        address from;
        uint256 timestamp;
        string name;
        string message;
    }

    // List of memos received fromp friend+
    Memo[] memos;

    // Address of contract deployer
    address payable owner;

    // Deploy logic
    constructor() {
        owner = payable(msg.sender);
    }

    /**
     *  @dev buy coffee for contract owner
     *  @param _name name of coffee buyer
     *  @param _message a nice message  
     */
    function buyCoffee(string memory _name, string memory _message) public payable {
        require(msg.value > 0, "can't buy a coffee with 0 eth");

        // Add memo to storage
        memos.push(Memo(
            msg.sender,
            block.timestamp,
            _name,
            _message
        ));

        // Emit a log event when a new memo is created
        emit NewMemo(
            msg.sender,
            block.timestamp,
            _name,
            _message
        );
    }

    /**
    *  @dev send the entire balance stored in this contract to the owner
    */
    function withdrawTips() public {
        require(owner.send(address(this).balance));
    }

    /**
    *  @dev retrieve all the memos received and stored on the blockchain
    */
    function getMemos() public view returns (Memo[] memory) {
        return memos;
    }
}
