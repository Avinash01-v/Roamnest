const sampleListings = [
    {
        title: "Luxury Beach Villa",
        description: "A beautiful villa near the beach with a relaxing atmosphere.",
        image: {
            filename: "goa-beach-villa",
            url: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80"
        },
        price: 4500,
        location: "Goa",
        country: "India"
    },

    {
        title: "Royal Heritage Haveli",
        description: "Experience the royal architecture and culture of Rajasthan.",
        image: {
            filename: "jaipur-haveli",
            url: "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1200&q=80"
        },
        price: 3800,
        location: "Jaipur",
        country: "India"
    },

    {
        title: "Lake View Palace Stay",
        description: "A peaceful stay overlooking the beautiful lakes of Udaipur.",
        image: {
            filename: "udaipur-lake",
            url: "https://images.unsplash.com/photo-1603262110263-fb0112e7cc33?auto=format&fit=crop&w=1200&q=80"
        },
        price: 5200,
        location: "Udaipur",
        country: "India"
    },

    {
        title: "Mountain View Cottage",
        description: "Cozy cottage surrounded by the mountains of Himachal Pradesh.",
        image: {
            filename: "manali-mountains",
            url: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=1200&q=80"
        },
        price: 3200,
        location: "Manali",
        country: "India"
    },

    {
        title: "Backwater Retreat",
        description: "Relax beside the peaceful backwaters of Kerala.",
        image: {
            filename: "kerala-backwaters",
            url: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80"
        },
        price: 4200,
        location: "Alappuzha",
        country: "India"
    },

    {
        title: "Ganga View Homestay",
        description: "A comfortable homestay close to the famous ghats of Varanasi.",
        image: {
            filename: "varanasi-ghat",
            url: "https://images.unsplash.com/photo-1561361058-c24cecae35ca?auto=format&fit=crop&w=1200&q=80"
        },
        price: 2200,
        location: "Varanasi",
        country: "India"
    },

    {
        title: "Modern City Apartment",
        description: "Modern apartment located in the heart of Mumbai.",
        image: {
            filename: "mumbai-apartment",
            url: "https://images.unsplash.com/photo-1524230572899-a752b3835840?auto=format&fit=crop&w=1200&q=80"
        },
        price: 5500,
        location: "Mumbai",
        country: "India"
    },

    {
        title: "Heritage Delhi House",
        description: "Stay in a traditional home close to the historical attractions of Delhi.",
        image: {
            filename: "delhi-house",
            url: "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=1200&q=80"
        },
        price: 3000,
        location: "New Delhi",
        country: "India"
    },

    {
        title: "Himalayan Escape",
        description: "A peaceful mountain retreat with beautiful Himalayan views.",
        image: {
            filename: "himachal-retreat",
            url: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80"
        },
        price: 3500,
        location: "Shimla",
        country: "India"
    },

    {
        title: "Riverside Retreat",
        description: "A relaxing stay beside the Ganges surrounded by nature.",
        image: {
            filename: "rishikesh-river",
            url: "https://images.unsplash.com/photo-1609947017136-9daf32a5eb16?auto=format&fit=crop&w=1200&q=80"
        },
        price: 2800,
        location: "Rishikesh",
        country: "India"
    },

    {
        title: "Desert Camp",
        description: "Experience the magic of the Thar Desert in a traditional desert camp.",
        image: {
            filename: "jaisalmer-desert",
            url: "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1200&q=80"
        },
        price: 2500,
        location: "Jaisalmer",
        country: "India"
    },

    {
        title: "Taj Mahal View Stay",
        description: "A comfortable stay near one of India's most famous monuments.",
        image: {
            filename: "agra-taj-mahal",
            url: "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=80"
        },
        price: 3000,
        location: "Agra",
        country: "India"
    },

    {
        title: "Coastal Paradise",
        description: "Beautiful coastal accommodation surrounded by tropical scenery.",
        image: {
            filename: "gokarna-beach",
            url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80"
        },
        price: 2700,
        location: "Gokarna",
        country: "India"
    },

    {
        title: "Tea Garden Cottage",
        description: "A peaceful cottage surrounded by the tea gardens of Munnar.",
        image: {
            filename: "munnar-tea-garden",
            url: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=1200&q=80"
        },
        price: 3600,
        location: "Munnar",
        country: "India"
    },

    {
        title: "Pink City Apartment",
        description: "Modern accommodation close to Jaipur's famous attractions.",
        image: {
            filename: "jaipur-city",
            url: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80"
        },
        price: 2900,
        location: "Jaipur",
        country: "India"
    },

    {
        title: "Goa Tropical House",
        description: "A stylish tropical home perfect for a relaxing Goa vacation.",
        image: {
            filename: "goa-house",
            url: "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?auto=format&fit=crop&w=1200&q=80"
        },
        price: 4000,
        location: "Panaji",
        country: "India"
    },

    {
        title: "Bangalore Urban Loft",
        description: "A modern loft located in a lively part of Bangalore.",
        image: {
            filename: "bangalore-loft",
            url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80"
        },
        price: 3500,
        location: "Bengaluru",
        country: "India"
    },

    {
        title: "Pondicherry French Villa",
        description: "A charming villa inspired by the French architecture of Pondicherry.",
        image: {
            filename: "pondicherry-villa",
            url: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1200&q=80"
        },
        price: 3200,
        location: "Puducherry",
        country: "India"
    },

    {
        title: "Kolkata Heritage Home",
        description: "Traditional accommodation in the cultural heart of Kolkata.",
        image: {
            filename: "kolkata-home",
            url: "https://images.unsplash.com/photo-1558431382-27e303142255?auto=format&fit=crop&w=1200&q=80"
        },
        price: 2400,
        location: "Kolkata",
        country: "India"
    },

    {
        title: "Ladakh Mountain Lodge",
        description: "A scenic mountain lodge surrounded by the landscapes of Ladakh.",
        image: {
            filename: "ladakh-lodge",
            url: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80"
        },
        price: 3800,
        location: "Leh",
        country: "India"
    },
    {
    title: "Riverside Wooden Cabin",
    description: "A cozy wooden cabin surrounded by greenery and peaceful river views.",
    image: {
        filename: "coorg-cabin",
        url: "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?auto=format&fit=crop&w=1200&q=80"
    },
    price: 3400,
    location: "Coorg",
    country: "India"
},

{
    title: "Beachside Wooden Cottage",
    description: "A charming cottage just a short walk from the beautiful beaches of Andaman.",
    image: {
        filename: "andaman-cottage",
        url: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=1200&q=80"
    },
    price: 4800,
    location: "Port Blair",
    country: "India"
},

{
    title: "Valley View Homestay",
    description: "A peaceful homestay offering stunning views of the Kashmir valley.",
    image: {
        filename: "kashmir-homestay",
        url: "https://images.unsplash.com/photo-1595815771614-ade9d7f0a5e5?auto=format&fit=crop&w=1200&q=80"
    },
    price: 4200,
    location: "Srinagar",
    country: "India"
},

{
    title: "Luxury Houseboat",
    description: "Enjoy a unique stay on a traditional houseboat surrounded by calm waters.",
    image: {
        filename: "srinagar-houseboat",
        url: "https://images.unsplash.com/photo-1582972236019-ea9e9c9a098c?auto=format&fit=crop&w=1200&q=80"
    },
    price: 5500,
    location: "Srinagar",
    country: "India"
},

{
    title: "Forest Treehouse",
    description: "A unique treehouse stay hidden among the lush forests of Wayanad.",
    image: {
        filename: "wayanad-treehouse",
        url: "https://images.unsplash.com/photo-1520984032042-162d526883e0?auto=format&fit=crop&w=1200&q=80"
    },
    price: 3900,
    location: "Wayanad",
    country: "India"
},

{
    title: "Hilltop Wooden Retreat",
    description: "A beautiful wooden retreat surrounded by misty hills and pine forests.",
    image: {
        filename: "mussoorie-retreat",
        url: "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1200&q=80"
    },
    price: 3300,
    location: "Mussoorie",
    country: "India"
},

{
    title: "Luxury Farmhouse",
    description: "A spacious farmhouse surrounded by fields and peaceful countryside.",
    image: {
        filename: "lonavala-farmhouse",
        url: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80"
    },
    price: 6200,
    location: "Lonavala",
    country: "India"
},

{
    title: "Modern Valley Apartment",
    description: "A stylish apartment with beautiful views of the Himalayan valley.",
    image: {
        filename: "dharamshala-apartment",
        url: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80"
    },
    price: 3100,
    location: "Dharamshala",
    country: "India"
},

{
    title: "Beachfront Luxury Villa",
    description: "A spacious luxury villa offering direct access to a peaceful beach.",
    image: {
        filename: "alibaug-villa",
        url: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80"
    },
    price: 7500,
    location: "Alibaug",
    country: "India"
},

{
    title: "Traditional Rajasthani Home",
    description: "Stay in a beautifully decorated traditional home filled with Rajasthani charm.",
    image: {
        filename: "jodhpur-home",
        url: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80"
    },
    price: 3600,
    location: "Jodhpur",
    country: "India"
},

{
    title: "Mountain Sunrise Cottage",
    description: "Wake up to breathtaking sunrise views from this peaceful mountain cottage.",
    image: {
        filename: "tawang-cottage",
        url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80"
    },
    price: 2900,
    location: "Tawang",
    country: "India"
},

{
    title: "Luxury City Penthouse",
    description: "A modern penthouse offering panoramic views of Hyderabad city.",
    image: {
        filename: "hyderabad-penthouse",
        url: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80"
    },
    price: 6800,
    location: "Hyderabad",
    country: "India"
},

{
    title: "Colonial Heritage Villa",
    description: "A beautiful heritage villa with classic architecture and peaceful surroundings.",
    image: {
        filename: "ooty-villa",
        url: "https://images.unsplash.com/photo-1601918774946-25832a4be0d6?auto=format&fit=crop&w=1200&q=80"
    },
    price: 4100,
    location: "Ooty",
    country: "India"
},

{
    title: "Lakeside Wooden House",
    description: "A cozy wooden house located beside a beautiful lake surrounded by mountains.",
    image: {
        filename: "nainital-house",
        url: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1200&q=80"
    },
    price: 3700,
    location: "Nainital",
    country: "India"
},

{
    title: "Forest View Resort",
    description: "A peaceful resort surrounded by dense forests and natural beauty.",
    image: {
        filename: "kanha-resort",
        url: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=1200&q=80"
    },
    price: 4500,
    location: "Kanha",
    country: "India"
},

{
    title: "Luxury Palace Stay",
    description: "Experience a royal stay in a beautifully restored palace property.",
    image: {
        filename: "jodhpur-palace",
        url: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1200&q=80"
    },
    price: 8500,
    location: "Jodhpur",
    country: "India"
},

{
    title: "Coconut Grove Villa",
    description: "A tropical villa surrounded by coconut trees and peaceful gardens.",
    image: {
        filename: "kovalam-villa",
        url: "https://images.unsplash.com/photo-1601918774946-25832a4be0d6?auto=format&fit=crop&w=1200&q=80"
    },
    price: 4300,
    location: "Kovalam",
    country: "India"
},

{
    title: "Riverside Bamboo Cottage",
    description: "A simple and peaceful bamboo cottage surrounded by nature.",
    image: {
        filename: "majuli-cottage",
        url: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1200&q=80"
    },
    price: 1800,
    location: "Majuli",
    country: "India"
},

{
    title: "Luxury Forest Villa",
    description: "A private villa surrounded by greenery with modern amenities.",
    image: {
        filename: "masinagudi-villa",
        url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
    },
    price: 5200,
    location: "Masinagudi",
    country: "India"
},

{
    title: "Desert Luxury Tent",
    description: "A comfortable luxury tent offering an unforgettable desert experience.",
    image: {
        filename: "sam-desert-camp",
        url: "https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?auto=format&fit=crop&w=1200&q=80"
    },
    price: 4600,
    location: "Sam",
    country: "India"
}
];

module.exports = {data: sampleListings}