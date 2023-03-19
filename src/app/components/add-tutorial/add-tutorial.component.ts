import { Component, OnInit } from '@angular/core';
import { Tutorial } from 'src/app/models/tutorial.model';
import { TutorialService } from 'src/app/services/tutorial.service';

@Component({
  selector: 'app-add-tutorial',
  templateUrl: './add-tutorial.component.html',
  styleUrls: ['./add-tutorial.component.scss'],
})
export class AddTutorialComponent implements OnInit {
  tutorial: Tutorial = {
    title: '',
    description: '',
    published: false,
  };
  submitted = false;

  constructor(private tutorialService: TutorialService) {}

  ngOnInit(): void {}

  async saveTutorial(): Promise<void> {
    const data = {
      title: this.tutorial.title,
      description: this.tutorial.description,
    };

    try {
      const res = await this.tutorialService.create(data);
      console.log(res);
      this.submitted = true;
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    } catch (e) {
      console.error(e);
    }
  }

  newTutorial(): void {
    this.submitted = false;
    this.tutorial = {
      title: '',
      description: '',
      published: false,
    };
  }
}
