import { Component, Input, OnInit } from '@angular/core';
import { TutorialService } from 'src/app/services/tutorial.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Tutorial } from 'src/app/models/tutorial.model';

@Component({
  selector: 'app-tutorial-details',
  templateUrl: './tutorial-details.component.html',
  styleUrls: ['./tutorial-details.component.scss'],
})
export class TutorialDetailsComponent implements OnInit {
  @Input() viewMode = false;

  @Input() currentTutorial: Tutorial = {
    title: '',
    description: '',
    published: false,
  };

  loadingCurrentEdit = false;
  message = '';

  constructor(
    private tutorialService: TutorialService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.viewMode) {
      this.getTutorial(this.route.snapshot.params['id']);
      this.message = '';
    }
  }

  async getTutorial(id: string): Promise<void> {
    try {
      this.loadingCurrentEdit = true;
      const data = await this.tutorialService.get(id);
      if (data) {
        this.currentTutorial = data;
        console.log(this.currentTutorial);
      }
      this.loadingCurrentEdit = false;
    } catch (e) {
      this.loadingCurrentEdit = false;
      console.error(e);
    }
  }

  async updatePublished(status: boolean): Promise<void> {
    const data = {
      title: this.currentTutorial.title,
      description: this.currentTutorial.description,
      published: status,
    };

    this.message = '';

    try {
      const res = await this.tutorialService.update(
        this.currentTutorial.id,
        data
      );
      this.currentTutorial.published = status;
      this.message = res.message
        ? res.message
        : 'The status was updated successfully!';
    } catch (e) {
      console.error(e);
    }
  }

  async updateTutorial(): Promise<void> {
    this.message = '';

    try {
      const res = await this.tutorialService.update(
        this.currentTutorial.id,
        this.currentTutorial
      );

      this.message = res.message
        ? res.message
        : 'This tutorial was updated successfully!';
    } catch (e) {
      console.error(e);
    }
  }

  async deleteTutorial(): Promise<void> {
    try {
      await this.tutorialService.delete(this.currentTutorial.id);
      this.router.navigate(['/tutorials']);
    } catch (e) {
      console.error(e);
    }
  }
}
