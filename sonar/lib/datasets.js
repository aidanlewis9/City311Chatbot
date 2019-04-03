module.exports.config = {
    "city info": {
        "name": "South Bend"
    },
    // Put these datasets in the order you want them displayed.
    // Every where you see something like {Pickup_Day} is where you need to get your variable from the ARCGIS dataset you are loading in.
    "datasets": [
        {
            "display name" : "Trash Pickup",
            "url": "https://gis.southbendin.gov/arcgis/rest/services/LandRecords/PublicEssentials/MapServer/4",
            "distance": 1,
            "question": "What location?",
            "template": "Trash pickup is coming up on {Pickup_Day}"
        },
        {
            "display name" : "Nearest Fire Hydrant",
            "url": "https://gis.southbendin.gov/arcgis/rest/services/Infrastructure/Water_Utility/MapServer/4",
            "distance": 200,
            "question": "What location?",
            "template": "The nearest fire hydrant is on the {LocDescrip}"
        },
        {
            "display name" : "Nearest Bus Stop",
            "url": "https://maps2.dcgis.dc.gov/dcgis/rest/services/DCGIS_DATA/Transportation_WebMercator/MapServer/53",
            "distance": 200,
            "question": "What location?",
            "template": "The nearest stop is at {BSTP_MSG_TEXT}"
        }
    ],

    "other options":[
        {
            "display name" : "email",
            "email": "",
            "question": "What would you like to e-mail 311? Please include your e-mail or phone number in the message.",
            "template": "Thank you, your message has been sent."
        },   
        {
            "display name" : "other",
            "search link": "",
            "question": "Okay. What would you like me to search for?",
            "template": "Here is what I found {LINK}"
        }
    ]
}
