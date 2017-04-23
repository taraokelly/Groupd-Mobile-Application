import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'page-create-project',
  templateUrl: 'create-project.html'
})
export class CreateProjectPage {

  member: String;

  project: Project;

  private projectForm : FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder) {
    this.setProjectNull();
    this.projectForm = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      thumb: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
      desc: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
      maxMembers: ['', Validators.compose([Validators.required])] //check int maybe?
      /*creator: ['', Validators.compose([Validators.required])],
      projectName: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      projectThumb: ['', Validators.compose([Validators.required, Validators.minLength(8)])]*/
    });
  }

  addMember(){
    if(this.member == null || this.member ==""){
        console.log("Null String");
      }
      else if(this.member.trim().length==0){
         console.log("String Full of Spaces");
         this.member=null;
      }
      else{
      this.project.projectMembers.push(this.member.replace(/^\s+|\s+$/g, ""));
      this.member=null;
    }
  }
  deleteMember(i){
    this.project.projectMembers.splice(i, 1);
  }
  addProject(){
    this.project.projectName=this.projectForm.value.name;
    this.project.projectThumb=this.projectForm.value.thumb;
    this.project.projectDesc=this.projectForm.value.desc;
    this.project.maxMembers=this.projectForm.value.maxMembers;
    console.log(this.project);
  }
  setProjectNull(){
    this.project ={
      projectId: null,
      projectName: null,
      projectThumb: null,
      projectCreator: null,
      projectMembers: [],
      maxMembers: null,
      projectDesc: null,
      comments: null,
      time: { type: null }
    }
  }

}
interface Project{
    projectId: String,
    projectName: String,
    projectThumb: String,
    projectCreator: String,
    projectMembers: String[],
    maxMembers: Number,
    projectDesc: String,
    comments: String,
    /*projectMembers: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}],
    
    tags: [String],
    projectDelete: Boolean,
    projectCompleted: Boolean,*/
    time: { type: Date }
}