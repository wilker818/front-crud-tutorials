import { Component, OnInit } from '@angular/core';
import { Tutorial } from 'src/app/models/tutorial.model';
import { TutorialService } from 'src/app/services/tutorial.service';

@Component({
  selector: 'app-tutorials-list',
  templateUrl: './tutorials-list.component.html',
  styleUrls: ['./tutorials-list.component.scss'],
})
export class TutorialsListComponent implements OnInit {
  tutorials: Tutorial[] = [];
  loadingItem = false;
  currentTutorial: Tutorial = {};
  currentIndex = -1;
  title = '';

  constructor(private tutorialService: TutorialService) {}

  ngOnInit(): void {
    this.retrieveTutorials();
  }

  async retrieveTutorials(): Promise<void> {
    try {
      this.loadingItem = true;
      const data = await this.tutorialService.getAll();
      this.tutorials = data;
      console.log(this.tutorials);
      this.loadingItem = false;
    } catch (e) {
      this.loadingItem = false;
      console.error(e);
    }
  }

  refreshList(): void {
    this.retrieveTutorials();
    this.currentTutorial = {};
    this.currentIndex = -1;
  }

  setActiveTutorial(tutorial: Tutorial, index: number): void {
    this.currentTutorial = tutorial;
    this.currentIndex = index;
  }

  async removeAllTutorials(): Promise<void> {
    try {
      await this.tutorialService.deleteAll();
      this.refreshList();
    } catch (e) {
      console.error(e);
    }
  }

  async searchTitle(): Promise<void> {
    try {
      this.currentTutorial = {};
      this.currentIndex = -1;
      this.tutorials = await this.tutorialService.findByTitle(this.title);
    } catch (e) {
      console.error(e);
    }
  }
}
