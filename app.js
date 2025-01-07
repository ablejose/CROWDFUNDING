//
document.getElementById('connectButton').addEventListener('click', async () => {
    // Check if MetaMask is installed
    if (typeof window.ethereum === 'undefined') {
      alert('MetaMask is required to interact with the blockchain!');
      return;
    }
  
    // Request account access from MetaMask
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
  
    // Set up provider and signer using MetaMask
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
  
    // Contract details (replace these with your actual contract details)
    const contractAddress = 0x9aF75f793c71b45Fa7E67308394E21599D87D712;  // Replace with your deployed contract address
    const abi =
        [
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "_id",
                        "type": "uint256"
                    }
                ],
                "name": "contribute",
                "outputs": [],
                "stateMutability": "payable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "_goal",
                        "type": "uint256"
                    },
                    {
                        "internalType": "string",
                        "name": "_name",
                        "type": "string"
                    }
                ],
                "name": "startCampaign",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "_id",
                        "type": "uint256"
                    }
                ],
                "name": "withdraw",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "campaignCount",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "name": "campaigns",
                "outputs": [
                    {
                        "internalType": "address payable",
                        "name": "owner",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "goal",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "pledged",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bool",
                        "name": "completed",
                        "type": "bool"
                    },
                    {
                        "internalType": "string",
                        "name": "name",
                        "type": "string"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            }
        ];
  
    const contract = new ethers.Contract(contractAddress, abi, signer);
  
    // Handle campaign creation form submission
    document.getElementById('campaignForm').addEventListener('submit', async function (e) {
      e.preventDefault();  // Prevent default form submission
  
      const name = document.getElementById('name').value; // Get campaign name from the form
      const goal = document.getElementById('goal').value; // Get goal amount from the form
  
      try {
        // Call the startCampaign function on the contract
        const tx = await contract.startCampaign(
          ethers.utils.parseEther(goal),  // Convert goal to Wei
          name
        );
  
        // Wait for the transaction to be mined
        await tx.wait();
        alert('Campaign started successfully!');
      } catch (error) {
        console.error('Error starting campaign:', error);
        alert('Failed to start campaign.');
      }
    });
} catch (error) {
    console.error('User denied account access or another error:', error);
    alert('Please connect to MetaMask first.');
  }
});

  
  // Connect to the blockchain when the page loads
//