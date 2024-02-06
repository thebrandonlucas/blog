<svelte:head>

  <title>Zero2Prod Chapter 5 Summary - Deployments</title>
  <meta name="description" content="This chapter shows how to use Docker to virtualize your app and deploy it to the web using Digital Ocean" />
</svelte:head>

# Zero2Prod Chapter 5 Summary - Deployments

This chapter was all about deployments, which, as the author explains, is often overlooked in programming books because the advice is unstable. What is considered "best practice" is still in flux and up for debate, and therefore people are hesitant to write books about topics whose material will become outdated shortly after publication. Anyone who's read an older programming book knows this pain, and how it can slow and confuse the learning process. I'm not going to highlight all the code that the author goes through in this chapter, but instead focus on knowledge gaps I had while reading and try to fill them based on what we did, as well as reiterate useful tidbits to myself for the future.

But deployments are such an essential aspect of modern programming that the author feels duty-bound to include it, and we learn a lot of fun concepts along the way.

### Virtualization

_Virtualization_ is a technology that allows you to simulate hardware within a software environment.

One reason for doing this might be to allow you to run software that couldn't otherwise run on your machine. For example, if you have a Mac, it's common to use a program like [VirtualBox](https://www.virtualbox.org/) to download a _virtualized_ Windows or Linux environment that allows you to run programs within them.

Since software can make assumptions about the underlying hardware, configuration, permissions, and other things external to the program itself, we can save ourselves a lot of future trouble by creating an environment pre-tailored to our needs that includes everything needed to run our application. Then, instead of merely shipping the _code_ to a production environment which can vary across platforms and won't be replicable on your machine, you ship an environment containing everything needed to run your application.

Using virtualization software, you can have a consistent abstraction for your application environment that can allow you to run it across different environments and machines.

### Docker

The virtualization software used in this chapter is Docker, which is probably the [most ubiquitous](https://www.statista.com/statistics/1256245/containerization-technologies-software-market-share/) choice. Docker calls it's virtualized runtime environment a _container_. You can create an _image_ to serve as a snapshot or blueprint file for the container, providing all the information about a container at a given moment of time that's needed to reconstruct it later if the container is stopped or deleted. Images can also be created from [_Dockerfiles_](https://docs.docker.com/engine/reference/builder/), which are template files used to generate a Docker image, using a custom [Domain-Specific Language (DSL)](https://en.wikipedia.org/wiki/Domain-specific_language) created just for Docker to perform actions. Docker's official documentation puts it well: "A Dockerfile is a text document that contains all the commands a user could call on the command line to assemble an image". So, Docker builds an image by reading instructions from a Dockerfile.

The book gives an example of a very simple Dockerfile for a Rust project:

```
FROM rust:1.63.0

WORKDIR /app

# minimal dependencies
RUN apt update && apt install lld clang -y

COPY . .

RUN cargo build --release

ENTRYPOINT["./target/release/zero2prod"]
```

Since I wasn't familiar with Dockerfiles, a lot of what was happening here was confusing to me. Looking at the [keywords](https://docs.docker.com/engine/reference/builder/#overview) helped, but there were still some points of confusion:

- `FROM rust:1.63.0`: The definition says: "Create a new build stage from a base image". Okay, sure, but what is a base image? Well, Docker containers are built in [_layers_](https://docs.docker.com/build/guide/layers/), where each instruction corresponds to a layer. Layers build on top of each other, such that layers that come later are dependent on previous layers. You could write a Dockerfile from scratch (using `FROM scratch` at the beginning of your file), but in our case, it would be very tedious to write out the specifications to build a Rust environment _in addition_ to just what's needed for our application. So, here, we're using an image that the Rust team created for us and [put on dockerhub](https://hub.docker.com/layers/library/rust/1.63.0/images/sha256-4d6b7664f5292cdfbeaa7eb9f1f4eae01aa289a49e4f043cdf6f4f63d0cf8ca8?context=explore), which seems to be where the `FROM` keyword will check for images by default. It seems to be the default registry of Docker images in the same way that [`npm`](https://www.npmjs.com/) is the default registry for Node.js apps, so calling `FROM <base-image>` is to dockerhub as calling `npm install <package>` is to [`npm`](https://www.npmjs.com/).
- `COPY . .`: Reading the [docs](https://docs.docker.com/engine/reference/builder/#copy) helped a lot here, but I couldn't quite inuit everything from the command alone (maybe I should've been able to). Here's the command spelled out for simpletons like me:
  - `COPY <source-files-on-local-machine> <destination-files-in-docker-container>`. So, copy everything from the source machine at `.` (meaning, everything from wherever the Dockerfile is, in the case of Zero2Prod, the project root) to a path in the Docker container relative to `WORKDIR`, so in this case, since our `destination` is `.` and `WORKDIR` is `/app`, just copy everything to `app`. Another important note on this `COPY` command is that it specifies the [_build context_](https://docs.docker.com/build/building/context/), which is the "set of files that your build can access". The `COPY` command here, is the _point of contact_ between the Docker image and our machine's files.

The other keywords were more straightforward to me from a quick glance at the documentation, not too bad.

### Building a Container

The command `docker build` creates an image from a _recipe_ (a lovely term for it, in this case, it's our Dockerfile) and a build context. `docker build` won't be able to see anything else. We can build a Docker container with our project and the Dockerfile now using:

```
docker build --tag zero2prod --file Dockerfile .
```

`--tag <name>` allows us to name the resulting image so we can reference it later, and `--file Dockerfile .` specifies the file and the build context path: in this case, our project root. Changing this would change where the `COPY` command copies from.

### Offline Mode for Deployment Migrations

Because our app uses a database server, and our Docker container can't see the server we have running locally, the app will fail to establish a connection upon compilation in the Docker container. Normally during compile-time, sqlx will call into the database to make sure that all the queries we've written can be successfully executed (based on the queries written), but it can't do that with our virtualized container. This section describes how to use `sqlx`'s `offline` feature to generate metadata about the SQL queries you've written while you do have access to the database so that you can still compile in an environment without a database connection -- it will just use the results of the metadata, which is saved in the project root. An interesting solution!

### Running an Image

To run the image, simply run `docker run` with the tag name you gave it earlier:
`docker run zero2prod`. This runs the `ENTRYPOINT` command specified in the Dockerfile.

### Exposing Ports

The app doesn't run yet because we aren't exposing the port, which we have to do explicitly if our machine is to have access to it. Use `-p` flag to expose ports, separated by a colon, where the first is the port on the host machine and the second is the port in docker to map to. In our case, they're the same:

```
docker run -p 8000:8000 zero2prod
```

### Hierarchical Configuration

Since our configuration is being deployed in multiple environments, we need a way to manage our environment variables. The book takes a hierarchical approach, including a base configuration file for variables shared across every environment (i.e. the database name), and a couple environment-specific files (one for local development and one for production deployments in our case). The changing variable here will be the host (e.g. `127.0.0.1` for local or `0.0.0.0` for deployments). Lastly, we'll have an environment variable called `APP_ENVIRONMENT` which will tell us the running environment and tell us which set of variables to use (`production` or `local`).

### Optimizing Docker Images

There are a few things we can do to optimize the size of the Docker image that is produced. As it stands, the size of the image we've generated is around `2GB`. From the book:

```
docker images zero2prod

REPOSITORY    TAG      SIZE
zero2prod     latest   2.31GB
```

The book walks through various methods to slim this down. Here are a couple quick tips:

- Use a [`.dockerignore`](https://docs.docker.com/engine/reference/builder/#dockerignore-file) to exclude things you don't need (or want) in the build context and resulting image, such as the directory containing the executable `/target`.
- [Multi-stage builds](https://docs.docker.com/build/building/multi-stage/): You can split your build into multiple stages and carry over select artifacts from one stage into the next. You can _discard_ what you don't want from a previous stage so that it doesn't contribute to the size of the image at the end of the build. The example given in the book splits the build into two stages, the _builder_ stage and the _runtime_ stage. The builder stage builds an executable for release, and the runtime stage copies _only the executable_ to the runtime environment.
- **Smaller base images**: You can't have your image be smaller than the base image it uses - the resulting image of your build is a superset of what's included in the base image. The size of the base image is therefore a lower bound on the size of your image. In the book, the author chooses a very small bare operating system as the base image for the runtime stage: `debian:bullseye-slim`. Keep in mind that we still need to use an image with the rust toolchain to _build_ our executable, but once we hand that off to the runtime stage, whose base image is just a bare debian OS, we can _run_ the executable without any Rust tooling.
- Lastly, we can cache Docker builds by taking advantage of and understanding Docker's _layer_ concept in more depth. Earlier we mentioned layers to note that subsequent Docker commands are dependent on preceding commands. The reason for this is that it allows a clever system of _caching_ to take place. Docker can save the result of each layer in a cache, and subsequent layers can simply use the cached results of previous layers so long as nothing in them has changed. Practically, what this means is that you should order the actions/layers in your Dockerfile in order of ascending frequency of change - the more something changes, the later in the Dockerfile it occurs. In other words, put the installation of your dependencies (which shouldn't change frequently) _before_ `COPY`ing your code (which _does_ change frequently) over, to take maximal advantage of the caching and speed up your build times (which, in Rust, are famously long). One last point to mention here is that this pattern of copying a lock-file containing dependencies, building them, and then copying over the rest of the source code before building the project is a common pattern, one that you can use the project [`cargo-chef`](https://github.com/LukeMathWalker/cargo-chef) (interestingly, notice that the project's main contributor is also the author of the book) to do in Rust.

The remainder of the chapter talks about deploying to Digital Ocean, which I won't summarize here as the advice given varies widely across platforms.
