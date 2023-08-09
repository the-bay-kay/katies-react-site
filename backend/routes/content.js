const router = require('express').Router();

/* Larger blocks of text, such as the "About Me" section or the 
 * "Project Overview" pages, will be stored in .json files.  The hope 
 * is that this will maintain legibility in the JSX code, and allow flexibility
 * when editing the pages themselves.
 * As of now, the format for the JSX objects is:
 * 
 * {
 *  "id" : "name_of_component"
 *  "body": [["multiline paragraph", "strings"],["each array a paragraph"]] 
 * }
 * 
 */

var about = require('../content/about.json');

router.route('/about').get((req, rest) => {
    console.log(about)
    rest.status(202).json(about);
})

module.exports = router;