export class LostAndFoundConfig {
    private static path = 'http://localhost:3000';
  
    public static getPath(): string {
      return  LostAndFoundConfig.path;
    }
  }