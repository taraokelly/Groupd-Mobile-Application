import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ContainsCharacterValidator } from '../../validators/contains-character-validator';

import { Proj } from '../../objects/project';

@Component({
  selector: 'page-create-project',
  templateUrl: 'create-project.html'
})
export class CreateProjectPage {

  member: String;

  project: Proj;

  private projectForm : FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder) {
    this.setProjectNull();
    this.projectForm = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required, ContainsCharacterValidator.hasCharacter])],
      thumb: ['', Validators.compose([Validators.required, ContainsCharacterValidator.hasCharacter])],
      desc: ['', Validators.compose([Validators.required, ContainsCharacterValidator.hasCharacter])],
      maxMembers: ['', Validators.compose([Validators.required])] //check int maybe?
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
    this.project.projectName=this.projectForm.value.name.replace(/^\s+|\s+$/g, "");
    this.project.projectThumb=this.projectForm.value.thumb.replace(/^\s+|\s+$/g, "");
    this.project.projectDesc=this.projectForm.value.desc.replace(/^\s+|\s+$/g, "");
    this.project.maxMembers=this.projectForm.value.maxMembers.replace(/^\s+|\s+$/g, "");
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