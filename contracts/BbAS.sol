// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.4.25;

contract BbAS {
    mapping(address => address) public storeRealToGenerated;
    mapping(address => address[]) public storeGeneratedToReal;

    function signup(address realAddress) public returns (address) {
        address generatedAddress = address(
            bytes20(sha256(abi.encodePacked(now)))
        );
        storeRealToGenerated[realAddress] = generatedAddress;
        storeGeneratedToReal[generatedAddress].push(realAddress);
        return generatedAddress;
    }

    function login(address realAddress) public view returns (address) {
        return storeRealToGenerated[realAddress];
    }

    function linking(address realAddress, address newRealAddress)
        public
        returns (bool)
    {
        address generatedAddress = getGeneratedAddress(realAddress);
        storeGeneratedToReal[generatedAddress].push(newRealAddress);
        storeRealToGenerated[newRealAddress] = generatedAddress;
        return true;
    }

    function getGeneratedAddress(address realAddress)
        public
        view
        returns (address)
    {
        return storeRealToGenerated[realAddress];
    }

    function getGeneratedToRealMappingAddresses(address generatedAddress)
        public
        view
        returns (address[] memory)
    {
        return storeGeneratedToReal[generatedAddress];
    }
}
