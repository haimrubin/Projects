package components;


/**
 * @author HaimRubin-209467281 & MatanFadida-315585505
 */

public class Point {
	private static final long serialVersionUID = 1L;
	private int x;
	private int y;
	
	
	public Point(int x, int y) {
		this.x = x;
		this.y = y;
		
	}
	
	public int getX() {
		return x;
	}
	
	public int getY() {
		return y;
	}
	
	public void setX(int x) {
		this.x = x;
	}
	
	public void setY(int y) {
		this.y = y;
	}
}
