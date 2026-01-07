class Resources {
  constructor() {
    // everything we plan to draw
    this.toLoad = {
      background: "/data/Images/pelletTown.png",
      // heroImg
      shadow: "/data/Images/shadow.png",
      body: "/data/Images/playerRight.png",
    };

    this.images = {};

    // load image
    Object.keys(this.toLoad).forEach((key) => {
      const img = new Image();
      img.src = this.toLoad[key];

      this.images[key] = {
        image: img,
        isLoaded: false,
      };

      img.onload = () => {
        this.images[key].isLoaded = true;
      };
    });
  }
}

// create one instance for the whole app to use
export const resources = new Resources();
