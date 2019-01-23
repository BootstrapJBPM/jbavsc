# jbavsc - jBoss Business Application Extension for Visual Studio Code

Visual Studio Code extension used to generate your jBPM Business Applications.

To generate your app via Web use: [start.jbpm.org](start.jbpm.org).
To generate your app via command-line use: [https://www.npmjs.com/package/jba-cli](https://www.npmjs.com/package/jba-cli).

## How to use

1. Make sure you are in a workspace (directory) where you would like to generate your jBPM Business Application.
2. Open the Command Palette (⇧⌘P on OSX for example). Enter in command:

```
> Generate jBPM Business Application
```

![Command Palette Generation](assets/cpGenerate.png)

## Generation Options

You can chose to either generate your application using default settings, or can customize it via configurations:

![Generation Options](assets/generationOptions.png)

Selecting the configuration generation option will guide you though a number of steps and then generate your business application in the current working directory.

## App generation via Configuration

If you chose to configure your jBPM Business app you want to generate you
will be guided through a 5 step process:

1. Application type: Here you can pick what app type you want to generate. Options are "Business Automation", "Decision Management", and "Business Optimization".

![App Type Selection](assets/configstep1.png)

2. Application name: Enter your application name here, or leave the default "business-application" entry.

![App Name Selection](assets/configstep2.png)

3. Application package name: Enter your application package name here, or leave the default "com.company" entry.

![App Package Name Selection](assets/configstep3.png)

4. Application KIE version: Pick from one of the KIE versions. If the version you want to use is not available (we will update the versions as we update this extension in the future) you can always change it in your generated application pom.xml files.

![KIE Version Selection](assets/configstep4.png)

5. Application components: Select one of the two availabe application components. If you would like to develop processes that use Case Management you should select the dynamic assets.

![App Components Selection](assets/configstep5.png)

## Generated app in your working directory

After the generation process this extension will generate your jBPM Business app zip file and also extract it into your current working directory. You will see the generated app modules:

![Generated App](assets/generatedApp.png)

## Prerequisites

1. npm and Node.js - [https://www.npmjs.com/get-npm](https://www.npmjs.com/get-npm)

## Known Issues

This extension tries to install the [jba-cli](https://www.npmjs.com/package/jba-cli) npm package for you during generation.
In the case you dont have direct user access on your machine it can happen that your business application
zip and modules do not get generated. In this case try to run with your current user:

```
npm install
```

If you get a message saying for example:

```
Missing write access to /usr/lib/node_modules
...
```

you will have to first run for example:

```
sudo npm install -g jba-cli
```

and provide your sudo password in order to install this package first. Then re-run the extension and
your business application should be generated without issues.

## Build and Install locally

If you do not want to get this extension from the Marketplace or would like to build and test
the latest changes/updates locally follow these steps:

1. Clone the extension git repository

```
git clone https://github.com/BootstrapJBPM/jbavsc.git
cd jbavsc
```

2. Build and package the extension with vsce:

```
vsce package
```

To install vsce run:

```
npm install -g vsce
```

3. vsce will create a jbavsc-$VERSION$.vsix file which you have to install to your ide, for this run:

```
code --install-extension jbavsc-$VERSION$.vsix
```

to uninstall the extension run:

```
code --uninstall-extension jbavsc-$VERSION$.vsix
```

## Contributing

We welcome all contributions and help to make this extension better. Before you start please read the [Developing Drools and jBPM](https://github.com/kiegroup/droolsjbpm-build-bootstrap/blob/master/README.md) guide.
Best way to contribute is to create Pull Request(s) on the github project.
