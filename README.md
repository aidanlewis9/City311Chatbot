# ServiceProjectsBot

Just some basic notes right now in terms of deployment:
1. Give your executor role full Admin access
2. For the Twilio set up, use the full number, including the +1 part. No need for quotation marks or anything.
3. Use node 8

To add options to the 311 chatbot, edit the lib/datasets.js file. Currently there are three sample datasets in the file: "Trash Pickup", "Nearest Fire Hydrant", and "Nearest Bus Stop". As a result, if the chatbot was deployed at the moment, it would display three options to the user (one for each of the sample datasets). Each dataset consists of the following:
  1. "Display Name": What the user will see when this option is displayed.
  2. "url": A link to the corresponding ArcGIS dataset.
  3. "distance": This is the distance (in feet) to a certain point (for example, for the "Nearest Fire Hydrant" option, the distance is set to 200, so fire hydrants within 200 feet of the given location will be searched for).
  4. "question": The follow-up question the user will be asked after selecting this choice. If the option relies on a user's location or address, the question would be "What location?".
  5. "template": This will be the format of the final response to the user (after the user's location is taken into account). The text in curly braces refers to what the corresponding data for this option is called within a specific city's ArcGIS dataset.

To add a new dataset, simply follow the same format as the sample datasets in the file at the moment. The options will be displayed to the user in the order that the datasets have been entered (for example, in the case of the sample datasets, the first option displayed to the user would be "Trash Pickup"). Feel free to remove the sample datasets once you are ready to deploy.

Demo Video: https://drive.google.com/open?id=1OtX5Ct4us-Mrk9nAWd5PzcgTDCPueura
