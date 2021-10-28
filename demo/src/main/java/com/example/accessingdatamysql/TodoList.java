package com.example.accessingdatamysql;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity // This tells Hibernate to make a table out of this class
public class TodoList {
  @Id
  @GeneratedValue(strategy=GenerationType.AUTO)
  private String id;

  private String text;

  private Boolean finished;

  public String getId() {
    return id;
  }

  public void setId(String id) {
    this.id = id;
  }

  public String getText() {
    return text;
  }

  public void setText(String text) {
    this.text = text;
  }

  public Boolean getFinished() {
    return finished;
  }

  public void setFinished(Boolean finished) {
    this.finished = finished;
  }
}