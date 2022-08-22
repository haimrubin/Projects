package components;

import java.io.DataInputStream;
import java.io.EOFException;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.concurrent.locks.ReadWriteLock;

/**
 * @author HaimRubin-209467281 & MatanFadida-315585505
 * <p>fields:
 * <br>lock - read from the file all the packages
 */

public class ReadFile implements Runnable{
	File f = new File("C:\\Users\\מתן פדידה\\Desktop\\traking.txt");
	DataInputStream in = null;
	ReadWriteLock lock;
	public ReadFile(ReadWriteLock lock) {
		this.lock = lock;
	}
	
	@Override
	public void run() {
		try {
			lock.readLock().lock();
			in = new DataInputStream(new FileInputStream(f));
			while(true)
			{
				System.out.print(in.readInt());
				System.out.print(in.readChar());
				System.out.print(in.readInt());
				System.out.print(in.readChar());
				System.out.print(in.readUTF());
				System.out.print(in.readChar());
				System.out.print(in.readInt());
				System.out.print(in.readChar());
				System.out.print(in.readInt());
				System.out.print(in.readChar());
			}
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (EOFException e) {}
		 catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			System.out.println("aaaa");
		}

		finally
		{
			if (in != null) 
			{
				try
				{
					
					lock.readLock().unlock();
					in.close();
				} 
				catch (IOException e) {e.printStackTrace();}
			}
		}
		
	}
	

}
