class Resources {
  constructor() {
    // everything we plan to downlaod
    this.toLoad = {
      sky: "/sky.png",
      ground: "/ground.png",
      hero: "/hero-sheet.png",
      shadow: "/shadow.png",
      rod: "/rod.png",
      gold: "/goldbars.png",
    };
    // a bucket to keep all of our images
    this.images = {};

    // load each image
    Object.keys(this.toLoad).forEach((key) => {
      const img = new Image();
      img.src = this.toLoad[key];
      //   add to images
      this.images[key] = {
        image: img,
        isLoaded: false,
      };

      //   when imag loading successfuly
      img.onload = () => {
        this.images[key].isLoaded = true;
      };
    });
  }
}

// create one instance for the whole app to use
export const resources = new Resources();
