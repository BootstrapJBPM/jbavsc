# jbavsc - jBPM Business Application Extension for Visual Studio Code

Visual Studio Code extension used to generate your jBPM Business Applications.

This extension tries to provide a full experience when developing jBPM Business Apps
inside Visual Studio Code.

Currently it provides in-editor commands to:

1. **Generate** jBPM Business Apps
2. **Debug** jBPM Business Apps

    (more to come **soon!**)

**Table of Contents**

-   [Commands](#commands)
-   [Usage](#usage)
    -   [Generate new app](#generate-new-app)
        -   [Generation Options](#generation-options)
        -   [App generation via Configuration](#app-generation-via-configuration)
        -   [Generated app in your working directory](#generated-app-in-your-working-directory)
    -   [Start your app](#start-you-rapp)
    -   [Debug your app](#debug-your-app)
-   [Building from source](#building-from-source)
-   [Contributing](#contributing)

## Commands

After installing this extension you will have two new commands available:

1. **Generate jBPM Business Application**
2. **Debug your jBPM Business Application**

These commands can be accessed via the Command Panellete. To open the Command Pallette
use F5 for Windows or ⇧⌘P on OSX).

## Usage

This section explains in detail how to use this extension and its commands.

### Generate new app

To generate a new jBPM Business application open VS Code in a workspace (directory) where you would like to generate it, for example:

```
mkdir myappfolder
cd myappfolder
code .
```

Now open the Command Palette in VS Code and enter in the command:

```
> Generate jBPM Business Application
```

![Command Palette Generation](assets/cpGenerate.png)

### Generation Options

You can chose to either generate your application using default settings, or can customize it via configurations:

![Generation Options](assets/generationOptions.png)

After your selection and before the app gets generated you will be presented with a confirmation dialog:

![Confirmation Dialog](assets/confirmdialog.png)

Selecting the configuration generation option will guide you though a number of steps and then generate your business application in the current working directory.

### App generation via Configuration

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

### Generated app in your working directory

After the generation process this extension will generate your jBPM Business app zip file and also extract it into your current working directory. You will see the generated app modules:

![Generated App](assets/generatedApp.png)

## Building from source

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

This extension is open-source and free to use to anyone.
All/any contributions are very welcome and much needed in order to make this extension much better.
Best way to contribute is to create Pull Request(s) on the github project.
