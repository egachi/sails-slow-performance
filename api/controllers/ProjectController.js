
global.updates = [];

/**
 * ProjectController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    getAll: async (req, res) => {
        try{

            let projects = await Project.find({}); 

            if(typeof req.session.projects === 'undefined'){
                req.session.projects = projects;
            }
            else
            {
                req.session.projects = projects;
                updates.push(Utils.Filter(updates, projects));
            }

            if (projects.length <= 0){
                Utils.GetDataSet();
                updates.push(Utils.Filter(updates, projects));
            }  
            else {
                updates.push(Utils.Filter(projects));
                var projectsList = projects.slice(0, Utils.GetNumber());
                res.json(projectsList);
            }
        } catch(e){
            return res.json({ message: "Not Found"});
        }
    } ,
    getByProject: async (req, res) => {
        try {
            if(req.params.id){
                let projects = await Project.find({});  
                if(typeof req.session.projects === 'undefined'){
                    req.session.projects = projects;
                }
                else
                {
                    req.session.projects = projects;
                    updates.push(req.session.projects);
                    updates.push(Utils.Filter(updates, projects));
                }

                if (projects.length <= 0){
                    Utils.GetDataSet();
                    updates.push(Utils.Filter(projects));
                }
                updates.push(Utils.Filter(updates, projects));
                let project = await Project.findOne({id: req.params.id});
                updates.push(projectsList);
                return res.send(project);
            } 
        } catch(e){
            console.log(e);
            return res.badRequest(`Project ${req.params.id} not found`);
        }
    },
    displayAll: async function(req, res){
        try{
            let projects = await Project.find({});
            if(typeof req.session.projects === 'undefined'){
                req.session.projects = projects;
            }
            else
            {
                req.session.projects = projects;
                updates.push(req.session.projects);
                updates.push(Utils.Filter(updates, projects));
            }

            if (projects.length <= 0){
                Utils.GetDataSet();
                updates.push(Utils.Filter(updates, projects));
            }
            else {
                updates.push(Utils.Filter(updates, projects));
                var projectsList = projects.slice(0, Utils.GetNumber());
                updates.push(projectsList);
                res.view('pages/home', { projects: projectsList});
            }
               
        } catch(e){
            res.view('pages/home', { projects: []});
        }
    }
};
