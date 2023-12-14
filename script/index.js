let map;
let travelStories = JSON.parse(localStorage.getItem("travelStories")) || [];
let plannedTrips = JSON.parse(localStorage.getItem("plannedTrips")) || [];
let currentPage = 0;
const tripsPerPage = 3;

function initMap() {
  map = new google.maps.Map(document.getElementById("mapid"), {
    center: { lat: 40.6114, lng: -73.9332 },
    zoom: 13,
  });
  addStoryMarkersToMap();
}

const saveStory = (
  latitude,
  longitude,
  title,
  location,
  date,
  content,
  photoBase64
) => {
  let storyData = {
    latitude: parseFloat(latitude.value),
    longitude: parseFloat(longitude.value),
    title,
    location,
    date,
    content,
    photo: photoBase64,
  };
  travelStories.push(storyData);
  localStorage.setItem("travelStories", JSON.stringify(travelStories));

  alert("Story submitted!");
  displayTravelStories();
  addStoryMarkersToMap();
};

// Event listener for story submission form
document
  .getElementById("story-submission-form")
  .addEventListener("submit", (event) => {
    event.preventDefault();
    //addNewStory();
    // Retrieve values from the form
    let latitude = document.getElementById("story-lat");
    let longitude = document.getElementById("story-lon");
    let title = document.getElementById("story-title").value;
    let location = document.getElementById("story-location").value;
    let travelDate = document.getElementById("travel-date").value;
    let story = document.getElementById("story").value;
    let photoFile = document.getElementById("story-photo").files[0];

    // Process and save the photo file if uploaded
    if (photoFile) {
      let reader = new FileReader();
      reader.onloadend = () => {
        let photoBase64 = reader.result;
        saveStory(
          latitude,
          longitude,
          title,
          location,
          travelDate,
          story,
          photoBase64
        );
      };
      reader.readAsDataURL(photoFile);
    } else {
      saveStory(latitude, longitude, title, location, travelDate, story, null);
    }
  });

// Function to save planned trip to local storage
const savePlannedTrip = (tripData) => {
  plannedTrips.push(tripData);
  localStorage.setItem("plannedTrips", JSON.stringify(plannedTrips));
  displayTripsForPage(currentPage);
};

// Event listener for trip planner submission form
document
  .getElementById("trip-planner-form")
  .addEventListener("submit", (event) => {
    event.preventDefault();

    // Retrieve and store trip data
    let tripData = {
      latitude: document.getElementById("story-lat").value,
      longitude: document.getElementById("story-lon").value,
      destination: document.getElementById("destination").value,
      startDate: document.getElementById("start-date").value,
      endDate: document.getElementById("end-date").value,
      preferences: document.getElementById("preferences").value,
    };

    savePlannedTrip(tripData);
  });

// Function to display all saved travel stories
const displayTravelStories = () => {
  let storiesContainer = document.getElementById("stories-container");

  // Check if there are no travel stories
  if (travelStories.length === 0) {
    // Display a message encouraging the submission of a story
    storiesContainer.innerHTML =
      "<p>No stories submitted yet. Have a travel story to share? Submit your story below!</p>";
    return; // Exit the function as there's nothing more to display
  }

  // If there are stories, create HTML content for each story
  let storiesHtml = travelStories
    .map((story, index) => {
      // Handle photo display if available
      let photoHtml = story.photo
        ? `<img src="${story.photo}" alt="Story photo" class="story-photo">`
        : "";
      // Return the HTML structure for each story
      return `
            <article class="story">
                <h3 class="story-title">${story.title}</h3>
                <p class=" latitude-Story">${story.latitude}</p>
                <p class=" longitude-Story">${story.longitude}</p>
                <p class="story-location">${story.location}</p>
                <p class="story-date">${story.date}</p>
                <p class="tory-photo">${photoHtml}</p>
                <button onclick="deleteTravelStory(${index})">Delete Story</button>
                <p class="story-content">${story.content}</p>
            </article>
        `;
    })
    .join(""); // Join all story HTML strings into one

  // Set the inner HTML of the stories container
  storiesContainer.innerHTML = storiesHtml;
};

// Function to display trips for a specific page
const displayTripsForPage = (page) => {
  const startIndex = page * tripsPerPage;
  const selectedTrips = plannedTrips.slice(
    startIndex,
    startIndex + tripsPerPage
  );
  const tripsContainer = document.getElementById("trips-container");

  tripsContainer.innerHTML = selectedTrips
    .map(
      (trip, index) => `
        <div class="trip">
            <p><strong>Latitude:</strong> ${trip.latitude}</p>
            <p><strong>Longitude:</strong> ${trip.longitude}</p>
            <p><strong>Destination:</strong> ${trip.destination}</p>
            <p><strong>Start Date:</strong> ${trip.startDate}</p>
            <p><strong>End Date:</strong> ${trip.endDate}</p>
            <p><strong>Preferences:</strong> ${trip.preferences}</p>
            <button onclick="deletePlannedTrip(${
              startIndex + index
            })">Delete Trip</button>
        </div>
    `
    )
    .join("");
};

// Event listeners for pagination buttons
document.getElementById("prev-page").addEventListener("click", () => {
  if (currentPage > 0) {
    currentPage--;
    displayTripsForPage(currentPage);
  }
});

document.getElementById("next-page").addEventListener("click", () => {
  if ((currentPage + 1) * tripsPerPage < plannedTrips.length) {
    currentPage++;
    displayTripsForPage(currentPage);
  }
});

const deletePlannedTrip = (index) => {
  confirm("Are you sure you want to delete this planned trip?")
    ? (plannedTrips.splice(index, 1),
      localStorage.setItem("plannedTrips", JSON.stringify(plannedTrips)),
      displayTripsForPage(currentPage))
    : null; // Do nothing if the user selects 'Cancel'
};

const deleteTravelStory = (index) => {
  confirm("Are you sure you want to delete this travel story?")
    ? (travelStories.splice(index, 1),
      localStorage.setItem("travelStories", JSON.stringify(travelStories)),
      displayTravelStories())
    : null; // Do nothing if the user selects 'Cancel'
};

const addStoryMarkersToMap = () => {
  travelStories.forEach((story) => {
    if (story.latitude && story.longitude) {
      let marker = new google.maps.Marker({
        position: { lat: story.latitude, lng: story.longitude },
        map: map,
        title: story.title,
        // latitude: story.latitude,
        // longitude:story.longitude
      });
      let infoWindow = new google.maps.InfoWindow({
        content: `<strong>${story.title}</strong><br>${story.location}`,
      });
      marker.addListener("click", () => {
        infoWindow.open(map, marker);
      });
    }
  });
};

document.addEventListener("DOMContentLoaded", () => {
  displayTravelStories();
  displayTripsForPage(currentPage);
});
