<h3 align="center">Tidol Deployment on OpenShift</h3>

  <p align="center">
    Deploying a website for reading books (manga, novel...) through OpenShift Developer Sandbox
  </p>
</div>


## Description
<p align="center"> <img src="https://i.imgur.com/drjXAFh.png"/ width="1280;"> </p>

<p align="center"> <i>Screenshot of Tidol Project Topology through OpenShift</i> </p>

<p align="center"> <img src="https://github.com/egnaro1007/tidol-fe/raw/main/assets/demo_1.png"/ width="1280;"> </p>

<p align="center"> <i>Screenshot of Tidol Website</i> </p>

### About the Website
A Website that offers users a seamless experience when reading books across multiple devices. 

This Website provides more extra features such as following books, history of all read chapters, comments...

### About Cloud Deployment
OpenShift Developer Sandbox makes migration process from local to remote quite uncomplicated, with lots of tools available for a number of usecases related.

To deploy the Website, only a small subset of its features was used:
- Use code directly from repository, clone and then build as images to run as a container
- Use template images (PostgreSQL) to quickly bring up a database instance
- Code, build, test directly on development server, without the needs of making changes to the original repository
- Serverless runtime (only run when has access), automatically handle routing and DNS nameservers
- High availability with config (min/max pods running)
- Monitor containers' health and extract logs through dashboards


## Technology Stack

### Frontend: [NextJS](https://nextjs.org/)
### Backend: [Django](https://www.djangoproject.com/)
### Database: [PostgreSQL](https://www.postgresql.org/)
### Cloud Deployment: [OpenShift Developer Sandbox](https://developers.redhat.com/developer-sandbox)


## Members

This project is contributed by [Chi Trung](https://github.com/chitrung-gg) 🌟, [Viet Tuan](https://github.com/egnaro1007) 🌟

_For more information, please refer to their Git homepages_


## Disclaimer
All copyrighted assets belong to their respective owners. This project is made for educational purposes and has no means of monetization.

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again! 🌟

## Licenses

This repository follows GNU General Public License
