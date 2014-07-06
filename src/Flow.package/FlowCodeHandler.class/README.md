FlowCodeHandler 
		
This class handles your Amber's code.

Your code is treated differently depending if ti's about Amber itself or if it's about your project.

For Amber itself, this handler uses FlowLibrary and for your project it keeps a class var ProjectLibrary to manage it with your own library.
Note that it's always expected that you put your own library there.

Your own libraries for your own projects are the right place to configure the path where your Amber's application files are gowing to be read and write. Note that Flow manages the code for only one project at the time. If you have many projects in the same image you need to change it accordingly.

Example:

	FlowCodeHandler projectLibrary: MyGreatAmberProjectLibrary default


MyGreatAmberProjectLibrary class>>basePath
	
	^ '/Users/sebastian/Documents/git/myGreatAmberProject' asPath  
	
...and

FlowLibrary class>>basePath
	
	^ '/Users/sebastian/Documents/git/amber' asPath    <-- that's where you have your local git clone of your forked amber
